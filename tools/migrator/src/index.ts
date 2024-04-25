import chalk from 'chalk';

export const migrator = (migration: string) => {
  // eslint-disable-next-line no-console
  console.log(chalk.green('Running migration:'), migration);
};
