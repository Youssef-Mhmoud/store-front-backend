import { Pool } from 'pg';
import config from './config/config';

const client = new Pool({
  host: config.host,
  database: config.database,
  user: config.user,
  port: +(config.dbPort as string),
  password: config.password,
});

export default client