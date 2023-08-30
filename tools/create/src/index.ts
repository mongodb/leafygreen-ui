/* eslint-disable no-console */
import { getLGConfig } from '@lg-tools/meta';

import { CreatePackageOptions } from './create.types';
import { createComponent } from './createComponent';
import { createSubComponent } from './createSubComponent';

export function createPackage(name: string, options: CreatePackageOptions) {
  const { scopes } = getLGConfig();

  const parent = options.parent;

  // TODO: get scope & directory from parent
  const scope = options.scope ?? Object.keys(scopes)[0];
  const directory = options.directory ?? scopes[scope];

  if (parent) {
    createSubComponent({ name, parent });
  } else {
    createComponent({
      name,
      scope,
      directory,
    });
  }
}
