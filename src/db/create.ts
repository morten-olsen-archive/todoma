import { createConnection, ConnectionOptions, Connection } from 'typeorm';
import models from 'models';

const resetDB = async (connection: Connection) => {
  const entities = connection.entityMetadatas;

  const tasks = entities.map(async (entity) => {
    const repository = connection.getRepository(entity.name);
    await repository.query(`DELETE FROM ${entity.tableName}`);
  });

  await Promise.all(tasks);
};

const createDB = async (options: ConnectionOptions) => {
  const connection = await createConnection({
    ...options,
    entities: [
      ...models,
      ...options.entities || [],
    ],
  });
  await connection.synchronize();

  return connection;
};

export { resetDB };

export default createDB;
