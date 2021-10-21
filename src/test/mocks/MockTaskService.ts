import EventEmitter from 'eventemitter3';
import LocalTask, { Statuses } from 'models/LocalTask';
import { nanoid } from 'nanoid';
import { ITasks, Query } from '../../services/ITasks';
import createQuery from '../query';

interface Events {
  taskUpdated: (id?: string) => void;
}

const clone = <T>(obj: T) => JSON.parse(JSON.stringify((obj))) as T;

class MockTaskService extends EventEmitter<Events> implements ITasks {
  data: LocalTask[] = [];

  constructor(data: LocalTask[] = []) {
    super();
    this.data = data;
  }

  find = async (query: Query) => {
    const builder = createQuery(this.data);
    const [result, count] = await query(builder as any).getManyAndCount();
    return [clone(result), count] as [LocalTask[], number];
  };

  getById = async (id: string) => {
    return clone(this.data.find(task => task.id === id)!);
  };

  toggleCompleted = async (task: LocalTask) => {
    this.data = this.data.map((current) => {
      if (current.id !== task.id) {
        return current;
      }
      return  {
        ...current,
        completionDate: current.completionDate ? null: new Date(),
      };
    }) 
    this.emit('taskUpdated', task.id);
  };

  togglePinned = async (task: LocalTask) => {
    this.data = this.data.map((current) => {
      if (current.id !== task.id) {
        return current;
      }
      return  {
        ...current,
        pinned: !task.pinned,
      };
    }) 
    this.emit('taskUpdated', task.id);
  };

  setStatus = async (task: LocalTask, status: Statuses) => {
    this.data = this.data.map((current) => {
      if (current.id !== task.id) {
        return current;
      }
      return  {
        ...current,
        status,
      };
    }) 
    this.emit('taskUpdated', task.id);
  };

  update = async (task: LocalTask) => {
    this.data = this.data.map((current) => {
      if (current.id !== task.id) {
        return current;
      }
      return  {
        ...task,
      };
    }) 
    this.emit('taskUpdated', task.id);
  };

  create = async (title: string) => {
    const task: LocalTask = {
      id: nanoid(),
      title,
      status: 'inbox',
      pinned: false,
      completionDate: null,
      children: [],
      remoteTasks: [],
    };
    this.data = [
      ...this.data,
      task,
    ];
    this.emit('taskUpdated', task.id);
    return clone(task);
  };

  addRemoteTask = async (localId: string, remoteId: string, provider: string) => {
    return this.getById(localId);
  };

}

export default MockTaskService;
