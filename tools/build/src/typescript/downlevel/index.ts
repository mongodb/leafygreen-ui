import chalk from 'chalk';
import path from 'path';
import fse from 'fs-extra';

import { downlevelDts } from './downlevel-dts';

interface DownlevelCommandOptions {
  verbose?: boolean;
}

/**
 * Downlevel TypeScript definitions
 * based on the typesVersions field in package.json.
 */
export function runTypescriptDownlevel({ verbose }: DownlevelCommandOptions) {
  const packageDir = process.cwd();
  verbose && console.log(chalk.blue.bold('Building TypeScript for production'));

  const packageJson = fse.readJSONSync(
    path.join(packageDir, 'package.json'),
    'utf-8',
  );
  const typesVersions = packageJson?.typesVersions;
  const downlevelVersions = getTypeVersions(typesVersions);

  if (downlevelVersions) {
    downlevelVersions.forEach(target => {
      downlevelDts({ verbose, target });
    });
  } else {
    verbose &&
      console.log(chalk.yellow('No typesVersions found in package.json'));
  }
}
