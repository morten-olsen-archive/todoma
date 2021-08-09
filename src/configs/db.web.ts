import { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
  type: 'sqljs',
  autoSave: true,
  location: 'data',
};

export default config;
