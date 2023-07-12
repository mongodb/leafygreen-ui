import { Command } from 'commander';
import { test } from '@lg-tools/test';
import { lint } from '@lg-tools/lint';

const cli = new Command('lg');

/** Test */
cli
  .command('test')
  .description('Tests leafygreen-ui packages with unified config.')
  .option('--watch', 'Watch all files you intend to test', false)
  .action(test);

/** Lint */
cli
  .command('lint')
  .option('-f, --fix', 'fix linting errors', false)
  .option('-e, --eslintOnly', 'run eslint only', false)
  .option('-p, --prettierOnly', 'run prettier only', false)
  .option('--pkgJsonOnly', 'run npmPackageJsonLint only', false)
  .option('--verbose', 'verbose mode', false)
  .action(lint);

cli.parse(process.argv);
