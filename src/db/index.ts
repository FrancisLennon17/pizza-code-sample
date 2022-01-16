import { createConnection, Connection } from 'typeorm';

import logger from '../logger';

// singleton pattern
// https://stackoverflow.com/questions/24547357/setting-up-singleton-connection-with-node-js-and-mongo
const databaseConnect = function dbConnection() {
  let db: Connection;

  async function dbConnect(): Promise<Connection> {
    try {
      logger.debug('fetching db');
      return createConnection({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: 5432,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        entities: [
          __dirname + '/entity/*.ts'
        ],
        synchronize: true, // bad practice
        logging: true
      });
    } catch (e) {
      logger.error('error fetching db: ', e);
      throw e;
    }
  }

  async function get(): Promise<Connection> {
      if (db === undefined) {
        db = await dbConnect();
      }
      return db;
  }

  return {
    get
  };
};

export default databaseConnect();
