import { Command } from 'commander';

import { buildPackage } from './rollup/build-package';
import { buildTSDoc } from './tsdoc/build-tsdoc';
import { buildTypescript } from './typescript/build-ts';
import { minifyPackage } from './minify';

const build = new Command('lg-build');
build.description('Build LeafyGreen packages');

build
  .command('bundle')
  .description('Bundle packages with Rollup')
  .option('-v, --verbose', 'Enable verbose logging', false)
  .option(
    '-d, --direct',
    'Build package using the lg-build rollup command directly from @lg-tools/build',
    true,
  )
  .action(buildPackage);

build
  .command('tsc')
  .description('Build TypeScript packages')
  .option('-v, --verbose', 'Enable verbose logging', false)
  .argument('[pass-through...]', 'Pass-through options for `tsc`')
  .option(
    '-d, --downlevel',
    'Downlevel TypeScript packages based on the typesVersions field in package.json',
    false,
  )
  .option(
    '-u, --update',
    'Update package.json typesVersions and exports fields',
    false,
  )
  .allowUnknownOption(true)
  .action(buildTypescript);

build
  .command('docs')
  .description('Build TSDoc documentation')
  .option('-v, --verbose', 'Enable verbose logging', false)
  .action(buildTSDoc);

build
  .command('minify')
  .description('Minify built JavaScript bundles')
  .option(
    '-p, --glob <glob>',
    'Glob pattern to match javascript files to minify, prefixed with ! to exclude',
    ['dist/**/*.js', '!dist/**/*-min.js'],
  )
  .option('-v, --verbose', 'Enable verbose logging', false)
  .action(minifyPackage);

build.parse(process.argv);
