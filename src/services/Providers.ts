import { Service } from 'typedi';
import { Connection, Repository } from 'typeorm';
import { nanoid } from 'nanoid';
import RemoteTaskProvider from '../models/RemoteTaskProvider';
import RemoteTask from '../models/RemoteTask';

interface Provider {
  getTask: <T extends RemoteTask>(id: string) => Promise<T>;
}

type ProviderFactoryList = {
  [name: string]: (config: any) => Promise<Provider>;
};

class ProviderFactories {
  #factories: ProviderFactoryList;

  constructor(factories: ProviderFactoryList) {
    this.#factories = factories;
  }

  public get = (name: string) => {
    return this.#factories[name];
  };
}

@Service()
class ProviderService {
  #providers: { [name: string]: Promise<Provider> } = {};
  #providerList: ProviderFactories;
  #providerRepo: Repository<RemoteTaskProvider>;

  constructor(providerList: ProviderFactories, connection: Connection) {
    this.#providerList = providerList;
    this.#providerRepo = connection.getRepository(RemoteTaskProvider);
  }

  public getProviderType = async (id: string) => {
    const entity = await this.#providerRepo.findOneOrFail({ id });
    return entity;
  };

  public getProvider = async (id: string) => {
    if (!this.#providers[id]) {
      const entity = await this.#providerRepo.findOneOrFail({ id });
      const config = JSON.parse(entity.config);
      const providerTask = this.#providerList.get(entity.type)(config);
      this.#providers[id] = providerTask;
    }
    return this.#providers[id];
  };

  public add = async (type: string, config: any) => {
    const provider = new RemoteTaskProvider();
    provider.id = nanoid();
    provider.type = type;
    provider.config = JSON.stringify(config);
    await this.#providerRepo.save(provider);
    return provider;
  };

  public getRemoteTask = async (providerId: string, taskId: string) => {
    const provider = await this.getProvider(providerId);
    const task = await provider.getTask(taskId);
    return task;
  };
}

export { Provider, ProviderFactories, ProviderFactoryList };

export default ProviderService;
