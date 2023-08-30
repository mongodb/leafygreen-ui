import { getLGConfig } from '@lg-tools/meta';
import fse from 'fs-extra';
import path from 'path';

/** Given a component name, return its absolute path */
export function getComponentPath(name: string): string | undefined {
  const { scopes } = getLGConfig();
  const rootDir = process.cwd();

  if (name.startsWith('@')) {
    // We have scope defined for us, so we can compute the absolute path
    const [scope, packageName] = name.split('/'); // ['@leafygreen-ui', 'button']
    const parentDir: string | undefined = scopes[scope]; // 'packages'

    if (fse.existsSync(path.resolve(rootDir, parentDir, packageName))) {
      return path.resolve(rootDir, parentDir, packageName);
    }
  } else {
    // We need to check all package directories for the component
    for (const dir of Object.values(scopes)) {
      // ['packages', 'tools'] / 'button'
      if (fse.existsSync(path.resolve(rootDir, dir, name))) {
        return path.resolve(rootDir, dir, name);
      }
    }
  }
}
