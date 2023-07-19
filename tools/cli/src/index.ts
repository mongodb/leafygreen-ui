import {
  build,
  buildPackage,
  buildTSDoc,
  buildTypescript,
} from '@lg-tools/build';
import { createPackage } from '@lg-tools/create';
import { installLeafyGreen } from '@lg-tools/install';
import { linkPackages, unlinkPackages } from '@lg-tools/link';
import { lint } from '@lg-tools/lint';
import { test } from '@lg-tools/test';
import { update } from '@lg-tools/update';
import { validate } from '@lg-tools/validate';
import { Command } from 'commander';

const cli = new Command('lg');
cli
  .description('Command line tools for the LeafyGreen UI library by MongoDB')
  .enablePositionalOptions();

/** Build */
cli
  .command('build')
  .description('Uses the local `turbo.json` to build packages in the repo')
  .argument('[packages...]', 'A list of packages to build')
  .option('--only=[steps...]', 'A list of build steps to run')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(build);

/** Create */
cli
  .command('create')
  .description('Creates a new package with the provided name')
  .argument('<name>', 'The name of the package')
  .option(
    '-s, --scope [scope]',
    'The npm scope of the new package',
    '@leafygreen-ui',
  )
  .option(
    '-d, --directory [directory]',
    'The directory to write the new package',
    './packages',
  )
  .action(createPackage);

/** Install */
cli
  .command('install')
  .description('Installs LeafyGreen packages to the current app')
  .argument('[packages...]', 'A list of packages to install')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option(
    '-W, --ignore-workspace-root-check',
    'Pass through flag for yarn',
    false,
  )
  .action(installLeafyGreen);

/** Update */
cli
  .command('update')
  .alias('upgrade')
  .description(
    'Updates installed LeafyGreen packages based on the specified range',
  )
  .argument('[packages...]', 'A list of packages to update')
  .option('--scope', 'The npm scope of the packages', '@leafygreen-ui')
  .option(
    '--latest',
    'Ignores the version range specified in `package.json`',
    false,
  )
  .action(update);

/** Test */
cli
  .command('test')
  .description('Tests leafygreen-ui packages with unified config.')
  // TODO: Files argument
  .option('--watch', 'Watch all files you intend to test', false)
  .option('--ci', 'Runs tests with CI configuration', false)
  .option(
    '-t, --testNamePattern <regex>',
    'Alias of jest --testNamePattern. Run only tests with a name that matches the regex.',
    undefined,
  )
  .action(test);

/** Lint */
cli
  .command('lint')
  .option('-f, --fix', 'fix linting errors', false)
  .option('-e, --eslintOnly', 'run eslint only', false)
  .option('-p, --prettierOnly', 'run prettier only', false)
  .option('--pkgJsonOnly', 'run npmPackageJsonLint only', false)
  .option('-v --verbose', 'Prints additional information to the console', false)
  .action(lint);

/** Validate */
cli
  .command('validate')
  .description('Validates build integrity, and package.json dependencies')
  .option('--buildsOnly', 'Validates build integrity only', false)
  .option('--depsOnly', 'Validates package dependencies only', false)
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('-f, --fix', 'Fixes issues found in dependency tree', false)
  .option(
    '--fix-tsconfig',
    "Fixes issues found in a package's tsconfig based on it's package.json",
    false,
  )
  .action(validate);

/** Link & Unlink */
cli
  .command('link')
  .description('Link local LeafyGreen packages to a destination app.')
  .argument('destination', 'The destination app path')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('--scope <name>', 'The NPM organization')
  .option(
    '--packages <names...>',
    'Specific package names (requires `scope` option, or full package name)',
  )
  .action(linkPackages);

cli
  .command('unlink')
  .description('Unlink local LeafyGreen packages from a destination app.')
  .arguments('destination')
  .option('-v --verbose', 'Prints additional information to the console', false)
  .option('--noInstall', 'Skip the yarn install step', false)
  .option('--scope <name>', 'The NPM organization')
  .action(unlinkPackages);

/** Build steps */
cli
  .command('build-package')
  .description('Builds a package')
  .action(buildPackage);
cli
  .command('build-ts')
  .description("Builds a package's TypeScript definitions")
  .action(buildTypescript);
cli
  .command('build-tsdoc')
  .description("Builds a package's TSDoc file")
  .action(buildTSDoc);

cli.parse(process.argv);
