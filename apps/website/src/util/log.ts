import { log } from 'log-type';

/**
 * Logs a message to the console with the prefix [DATABASE].
 * @param message The message to log.
 */
export function databaseLog(message: string) {
  log('[DATABASE]', 'green', message);
}
