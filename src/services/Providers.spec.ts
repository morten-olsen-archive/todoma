import { Container } from 'typedi';
import { Connection } from 'typeorm';
import createDB, { resetDB } from 'db/create';
import ProviderService, { ProviderFactories } from './Providers';

const demoProvider = async (config: any) => {
  return {
    config,
    getTask: jest.fn(async (id: string) => ({ id } as any)),
  };
};

describe('services/Providers', () => {
  let service: ProviderService;
  let connection: Connection;

  beforeAll(async () => {
    Container.reset();
    connection = await createDB({
      type: 'sqlite',
      name: 'services/Providers',
      dropSchema: true,
      database: ':memory:',
    });
    Container.set(Connection, connection);
    Container.set(
      ProviderFactories,
      new ProviderFactories({
        test: demoProvider,
      })
    );
    service = Container.get(ProviderService);
  });

  beforeEach(async () => {
    await resetDB(connection);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should be able to fetch a remote task', async () => {
    const { id } = await service.add('test', { foo: 'bar' });
    const task = await service.getRemoteTask(id, 'foo');
    const provider = (await service.getProvider(id)) as any;
    expect(provider.getTask).toHaveBeenCalledTimes(1);
    expect(provider.getTask).toHaveBeenCalledWith('foo');
    expect(provider.config).toEqual({ foo: 'bar' });
    expect(task.id).toBe('foo');
  });
});
