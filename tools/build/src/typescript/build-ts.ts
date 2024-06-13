/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

/**
 * Builds Typescript definitions for the current directory
 */
export function buildTypescript(
  passThru?: Array<string>,
  options?: Record<string, any>,
) {
  const { verbose } = options ?? { verbose: false };
  const packageDir = process.cwd();
  const tsConfigPath = path.join(packageDir, 'tsconfig.json');

  if (!fse.existsSync(tsConfigPath)) {
    console.error(chalk.red(`Could not find tsconfig in ${packageDir}`));
    process.exit(1);
  }

  verbose && console.log(chalk.gray('Building TypeScript'));

  spawn('tsc', ['--build', tsConfigPath, ...(passThru ?? [''])], {
    cwd: packageDir,
    stdio: 'inherit',
  }).on('exit', code => {
    process.exit(code ?? undefined);
  });
}
