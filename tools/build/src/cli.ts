import { Command } from 'commander';

import {
  registerBuildDocsCommand,
  registerBuildTSCommand,
  registerBundleCommand,
  registerMinifyCommand,
} from './cli-commands';

const build = new Command('lg-build');
build.description('Build LeafyGreen packages');

registerBundleCommand(build.command('bundle'));
registerBuildTSCommand(build.command('tsc'));
registerBuildDocsCommand(build.command('docs'));
registerMinifyCommand(build.command('minify'));

build.parse(process.argv);
