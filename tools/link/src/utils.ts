import chalk from 'chalk';

export const formatLog = {
  scope: (scope: string) => chalk.blue.bold(scope),
  path: (path: string) => chalk.bold(path),
  cmd: (cmd: string) => chalk.bgGray.black(cmd),
};
