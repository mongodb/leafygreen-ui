/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';

import { CreatePackageOptions } from './create.types';
import { createComponent } from './createComponent';

export function createPackage(name: string, options: CreatePackageOptions) {
  const { scopes } = getLGConfig();

  const parent = options.parent;

  // TODO: get scope & directory from parent
  const scope = options.scope ?? Object.keys(scopes)[0];
  const directory = options.directory ?? Object.values(scopes)[0];

  if (parent) {
    // TODO:
    // createSubComponent({});
  } else {
    createComponent({
      name,
      scope,
      directory,
    });
  }
}
