import { pino } from 'pino';

const loggerOptions = {
  level: process.env.LOG_LEVEL || 'debug'
};
const logger = pino(loggerOptions);

export default logger;
