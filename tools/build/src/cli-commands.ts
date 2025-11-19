import { Command } from 'commander';

import { buildPackage } from './rollup/build-package';
import { buildTSDoc } from './tsdoc/build-tsdoc';
import { buildTypescript } from './typescript/build-ts';

export function registerBundleCommand(command: Command) {
  command
    .description('Builds a package using Rollup')
    .option('-v, --verbose', 'Enable verbose logging', false)
    .option(
      '-d, --direct',
      'Build package using the lg-build rollup command directly from @lg-tools/build',
      true,
    )
    .action(buildPackage);
}

export function registerBuildTSCommand(command: Command) {
  command
    .description("Builds a package's TypeScript definitions")
    .argument('[pass-through...]', 'Pass-through options for `tsc`')
    .option('-v, --verbose', 'Enable verbose logging', false)
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
}

export function registerBuildDocsCommand(command: Command) {
  command
    .description('Build TSDoc documentation')
    .option('-v, --verbose', 'Enable verbose logging', false)
    .action(buildTSDoc);
}
