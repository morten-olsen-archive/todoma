import { ConnectionOptions } from 'typeorm';
import * as sqlite from 'expo-sqlite';

const config: ConnectionOptions = {
  type: 'expo',
  database: 'data2',
  driver: sqlite,
};

export default config;
