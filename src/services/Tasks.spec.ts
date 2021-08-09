import { Container } from 'typedi';
import { Connection } from 'typeorm';
import { resetDB } from '../../src/db/create';
import createDB from '../../src/db/create';
import TaskService from '../../src/services/Tasks';
import ProviderService, { ProviderFactories } from './Providers';
import { Statuses } from '../../src/models/LocalTask';

const demoProvider = async (config: any) => {
  return {
    config,
    getTask: jest.fn(async (id: string) => ({ id } as any)),
  }
};

describe('services/Tasks', () => {
  let service: TaskService;
  let connection: Connection;

  beforeAll(async () => {
    Container.reset();
    connection = await createDB({
      type: 'sqlite',
      name: 'services/tasks',
      dropSchema: true,
      database: ':memory:',
    });
    Container.set(Connection, connection);
    Container.set(ProviderFactories, new ProviderFactories({
      test: demoProvider,
    }));
    service = Container.get(TaskService);
  });

  beforeEach(async () => {
    await resetDB(connection);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should start with an empty task list', async () => {
    const [tasks, count] = await service.find(); 
    expect(count).toBe(0);
    expect(tasks).toHaveLength(0);
  });

  it('should be able to insert tasks', async () => {
    await service.create('Foo Bar');
    await service.create('Bar Baz');
    const [tasks, count] = await service.find(); 
    expect(tasks.map(t => t.title)).toEqual(['Foo Bar', 'Bar Baz']);
    expect(count).toBe(2);
    expect(tasks).toHaveLength(2);
    expect(tasks.map(t => t.status)).toEqual([
      Statuses.Inbox,
      Statuses.Inbox,
    ]);
  });

  it('should be able to attach remote tasks', async () => {
    const providerService = Container.get(ProviderService);
    const provider = await providerService.add('test', {});
    const { id } = await service.create('Foo Bar');
    await service.addRemoteTask(id, 'foo', provider.id);
    await service.addRemoteTask(id, 'baz', provider.id);
    const task = await service.getById(id);
    expect(task).toBeDefined()
    expect(task.title).toBe('Foo Bar');
    expect(task.description).toBe(null);
    expect(task.remoteTasks).toHaveLength(2);
    const [baz, foo] = task.remoteTasks;

    expect(foo.id).toBe('foo');
    expect(baz.id).toBe('baz');
  });
});
