import chalk from 'chalk';
import { Scope } from './scopes';

export const formatLog = {
  scope: (scope: keyof typeof Scope) => chalk.blue.bold(scope),
  path: (path: string) => chalk.bold(path),
  cmd: (cmd: string) => chalk.bgGray.black(cmd),
};
