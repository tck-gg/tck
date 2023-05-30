import { log } from 'log-type';

export function databaseLog(message: string) {
  log('[DATABASE]', 'green', message);
}
