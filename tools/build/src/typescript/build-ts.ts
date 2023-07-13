import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

/**
 * Builds Typescript definitions for the current directory
 */
export function buildTypescript() {
  const packageDir = process.cwd();
  const tsConfigPath = path.join(packageDir, 'tsconfig.json');

  if (!fs.existsSync(tsConfigPath)) {
    console.error(chalk.red(`Could not find tsconfig in ${packageDir}`));
    process.exit(1);
  }

  spawn('tsc', ['--build', tsConfigPath], {
    cwd: packageDir,
    stdio: 'inherit',
  });
}
