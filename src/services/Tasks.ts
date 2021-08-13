import { Service } from 'typedi';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  Repository,
  SelectQueryBuilder,
  UpdateEvent,
} from 'typeorm';
import { nanoid } from 'nanoid';
import EventEmitter from 'eventemitter3';
import LocalTask, { Statuses } from '../models/LocalTask';
import RemoteTask from '../models/RemoteTask';
import ProviderService from '../services/Providers';

interface Events {
  taskUpdated: (id?: string, task?: LocalTask) => void;
}

type Query = (
  query: SelectQueryBuilder<LocalTask>
) => SelectQueryBuilder<LocalTask>;

@Service()
@EventSubscriber()
class TaskService
  extends EventEmitter<Events>
  implements EntitySubscriberInterface<LocalTask>
{
  #localTaskRepo: Repository<LocalTask>;
  #remoteTaskRepo: Repository<RemoteTask>;
  #providerService: ProviderService;

  constructor(connection: Connection, providerService: ProviderService) {
    super();
    this.#providerService = providerService;
    this.#localTaskRepo = connection.getRepository(LocalTask);
    this.#remoteTaskRepo = connection.getRepository(RemoteTask);
  }

  listenTo() {
    return LocalTask;
  }

  afterUpdate(event: UpdateEvent<LocalTask>) {
    this.emit('taskUpdated', event.entity?.id, event.entity as LocalTask);
  }

  afterRemove(event: RemoveEvent<LocalTask>) {
    this.emit('taskUpdated', event.entity?.id, event.entity);
  }

  afterInsert(event: InsertEvent<LocalTask>) {
    this.emit('taskUpdated', event.entity?.id, event.entity);
  }

  public find = async (query: Query = (a) => a) => {
    const queryBuilder = this.#localTaskRepo.createQueryBuilder();
    const finalQueryBuilder = query(queryBuilder);
    const tasks = await finalQueryBuilder.getManyAndCount();
    return tasks;
  };

  public getById = async (id: string) => {
    const task = await this.#localTaskRepo.findOneOrFail(
      { id },
      {
        relations: ['remoteTasks'],
      }
    );
    return task;
  };

  public toggleCompleted = async (task: LocalTask) => {
    task.completionDate = task.completionDate ? null : new Date();
    await this.#localTaskRepo.save(task);
    this.emit('taskUpdated', task.id, task);
  };

  public togglePinned = async (task: LocalTask) => {
    task.pinned = !task.pinned;
    await this.#localTaskRepo.save(task);
    this.emit('taskUpdated', task.id, task);
  };

  public setStatus = async (task: LocalTask, status: Statuses) => {
    task.status = status;
    await this.#localTaskRepo.save(task);
    this.emit('taskUpdated', task.id, task);
  };

  public update = async (task: LocalTask) => {
    await this.#localTaskRepo.save(task);
    this.emit('taskUpdated', task.id, task);
  };

  public create = async (title: string) => {
    const task = this.#localTaskRepo.create({
      id: nanoid(),
      title: title,
      status: 'inbox',
    });
    await this.#localTaskRepo.save(task);
    this.emit('taskUpdated', task.id, task);
    return task;
  };

  public addRemoteTask = async (
    localId: string,
    remoteId: string,
    providerId: string
  ) => {
    const current = await this.getById(localId);
    const providerType = await this.#providerService.getProviderType(
      providerId
    );
    const remoteTask = await this.#providerService.getRemoteTask(
      providerId,
      remoteId
    );
    remoteTask.provider = providerType;
    remoteTask.read = true;
    await this.#remoteTaskRepo.save(remoteTask);
    current.remoteTasks.push(remoteTask);
    await this.#localTaskRepo.save(current);
    this.emit('taskUpdated', current.id, task);
    return current;
  };
}

export type { Query };

export default TaskService;
