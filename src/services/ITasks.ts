import {
  SelectQueryBuilder,
} from 'typeorm';
import LocalTask, { Statuses } from '../models/LocalTask';

type Query = (
  query: SelectQueryBuilder<LocalTask>
) => SelectQueryBuilder<LocalTask>;

interface ITasks {
  find: (query: Query) => Promise<[LocalTask[], number]>
  getById: (id: string) => Promise<LocalTask>;
  toggleCompleted: (task: LocalTask) => Promise<void>;
  togglePinned: (task: LocalTask) => Promise<void>;
  setStatus: (task: LocalTask, status: Statuses) => Promise<void>;
  update: (task: LocalTask) => Promise<void>;
  on: (evt: 'taskUpdated', fn: (id?: string) => void) => void;
  create: (title: string) => Promise<LocalTask>;
  addRemoteTask: (localId: string, remoteId: string, provider: string) => Promise<LocalTask>;
}

export { ITasks, Query };
