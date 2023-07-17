import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

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
