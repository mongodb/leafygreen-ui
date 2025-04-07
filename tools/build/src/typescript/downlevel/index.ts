import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';

import { downlevelDts } from './downlevel-dts';
import { getTypeVersions } from './getTypeVersions';

interface DownlevelCommandOptions {
  verbose?: boolean;
}

/**
 * Downlevel TypeScript definitions
 * based on the typesVersions field in package.json.
 */
export function runTypescriptDownlevel({ verbose }: DownlevelCommandOptions) {
  const packageDir = process.cwd();
  console.log('\nRunning TypeScript downleveling...', packageDir);

  const packageJsonPath = path.join(packageDir, 'package.json');
  const packageJson = fse.readJSONSync(packageJsonPath, 'utf-8');
  const typesVersions = packageJson?.typesVersions;
  const downlevelVersions = getTypeVersions(typesVersions);

  if (downlevelVersions && downlevelVersions?.length > 0) {
    downlevelVersions.forEach(target => {
      downlevelDts({ verbose, target });
    });
  } else {
    verbose &&
      console.log(chalk.yellow('No typesVersions found in package.json'), {
        typesVersions,
        downlevelVersions,
      });
  }
}
