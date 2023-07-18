import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

/**
 * Builds packages using rollup for the current directory
 */
export function buildPackage() {
  const packageDir = process.cwd();
  const localRollupConfigPath = path.join(packageDir, 'rollup.config.mjs');
  const defaultRollupConfigPath = path.join(
    __dirname, // __dirname is `dist`
    '../config/rollup.config.mjs',
  );

  // If there is a local rollup config defined, use that
  // Otherwise use the default one
  const rollupConfigPath = fs.existsSync(localRollupConfigPath)
    ? localRollupConfigPath
    : defaultRollupConfigPath;

  console.log({ __dirname });
  console.log(chalk.bgGray('Using Rollup config ', rollupConfigPath));

  spawn('rollup', ['--config', rollupConfigPath], {
    cwd: packageDir,
    stdio: 'inherit',
  });
}
