import { getLGConfig } from '@lg-tools/meta';
import path from 'path';

import { getComponentPath } from './getComponentPath';

export const getComponentRootDirectory = (options: {
  scope: string;
  parent?: string;
  directory?: string;
}): string => {
  const { parent, directory } = options;
  const rootDir = process.cwd();

  if (directory) {
    return path.resolve(rootDir, directory);
  }

  if (parent) {
    const parentPath = getComponentPath(parent);

    if (parentPath) {
      return parentPath;
    } else {
      throw new Error(`Parent component ${parent} not found`);
    }
  }

  const { scopes } = getLGConfig();
  return path.resolve(rootDir, scopes[options.scope]);
};
