import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';

/**
 * Builds packages using rollup for the current directory
 */
export function buildPackage() {
  const packageDir = process.cwd();
  const rollupConfigPath = path.join(packageDir, 'rollup.config.mjs');

  if (!fs.existsSync(rollupConfigPath)) {
    console.error(chalk.red(`Could not find rollup config in ${packageDir}`));
    process.exit(1);
  }

  spawn('rollup', ['--config', rollupConfigPath], {
    cwd: packageDir,
    stdio: 'inherit',
  });
}
