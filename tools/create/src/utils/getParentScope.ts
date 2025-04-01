import { getLGConfig } from '@lg-tools/meta';
import fse from 'fs-extra';
import path from 'path';

export const getParentScope = (parent?: string): string | undefined => {
  if (!parent) {
    return undefined;
  }

  const parentPath = parent.split('/');
  const parentScope = parentPath[0];

  if (parentScope.startsWith('@')) {
    return parentScope;
  }

  const { scopes } = getLGConfig();
  const rootDir = process.cwd();

  for (const checkScope of Object.keys(scopes)) {
    const checkScopePath = scopes[checkScope];

    if (fse.existsSync(path.resolve(rootDir, checkScopePath, parent))) {
      return checkScope;
    }
  }
};
