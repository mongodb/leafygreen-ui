import { lint } from '@lg-tools/lint';
import { test } from '@lg-tools/test';
import { linkPackages, unlinkPackages, Scope } from '@lg-tools/link';
import { Command, Option } from 'commander';

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

/** Link & Unlink */
cli
  .command('link')
  .description('Link local LeafyGreen packages to a destination app.')
  .argument('destination', 'The destination app path')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .addOption(
    new Option('--scope <name>', 'The NPM organization').choices(
      Object.keys(Scope),
    ),
  )
  .addOption(
    new Option(
      '--packages <names...>',
      'Specific package names (requires `scope` option, or full package name)',
    ),
  )
  .action(linkPackages);

cli
  .command('unlink')
  .description('Unlink local LeafyGreen packages from a destination app.')
  .arguments('destination')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('--noInstall', 'Skip the yarn install step', false)
  .addOption(
    new Option('--scope <name>', 'The NPM organization').choices(
      Object.keys(Scope),
    ),
  )
  .action(unlinkPackages);

cli.parse(process.argv);
