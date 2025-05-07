import chalk from 'chalk';

export const newURL = (href: string) => {
  try {
    return new URL(href);
  } catch (error) {
    console.error(chalk.red(`Invalid URL: ${href}`), error);
    process.exit(1);
  }
};
