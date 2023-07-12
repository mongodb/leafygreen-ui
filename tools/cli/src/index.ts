import { Command } from 'commander';
import { test } from '@lg-tools/test';

const cli = new Command('lg');

/** Test Command */
cli
  .command('test')
  .description('Tests leafygreen-ui packages with unified config.')
  .option('--watch', 'Watch all files you intend to test', false)
  .action(test);

cli.parse(process.argv);
