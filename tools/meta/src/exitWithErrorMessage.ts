/* eslint-disable no-console */
import chalk from 'chalk';

export function exitWithErrorMessage(message: string, code = 1) {
  console.log(chalk.red.bold(message));
  process.exit(code);
}
