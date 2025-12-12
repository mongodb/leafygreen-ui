/* eslint-disable no-console */
import chalk from 'chalk';

import { getComponentRootDirectory } from './utils/getComponentRootDirectory';
import { getScope } from './utils/getScope';
import { printInitialPublishInstructions } from './utils/printInitialPublishInstructions';
import { CreatePackageOptions } from './create.types';
import { createChangeset } from './createChangeset';
import { createComponent } from './createComponent';
import { createSubComponent } from './createSubComponent';

export function createPackage(name: string, options: CreatePackageOptions) {
  const parent = options.parent;

  const scope = getScope(options.scope, options.parent);
  const directory = getComponentRootDirectory({
    scope,
    parent,
    directory: options.directory,
  });

  options.verbose && console.log(chalk.bold('Creating package:'), name);
  options.verbose && console.log(chalk.bold('Scope:'), scope);
  options.verbose && console.log(chalk.bold('Root Directory:'), directory);
  options.verbose && console.log(chalk.bold('Parent component:'), parent);

  if (parent) {
    createSubComponent({
      ...options,
      name,
      parent,
    });
  } else {
    createComponent({
      ...options,
      scope,
      directory,
      name,
    });
    createChangeset({
      ...options,
      name,
      scope,
    });

    // Print instructions for initial publish
    printInitialPublishInstructions();
  }
}
