import chalk from 'chalk';
import { spawn } from 'cross-spawn';
import fse from 'fs-extra';
import path from 'path';

/**
 * Builds Typescript definitions for the current directory
 */
export function buildTypescript() {
  const packageDir = process.cwd();
  const tsConfigPath = path.join(packageDir, 'tsconfig.json');

  if (!fse.existsSync(tsConfigPath)) {
    console.error(chalk.red(`Could not find tsconfig in ${packageDir}`));
    process.exit(1);
  }

  spawn('tsc', ['--build', tsConfigPath], {
    cwd: packageDir,
    stdio: 'inherit',
  });
}
