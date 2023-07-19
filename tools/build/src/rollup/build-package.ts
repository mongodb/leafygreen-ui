/* eslint-disable no-console */
import chalk from 'chalk';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

interface BuildPackageOptions {
  /**
   * Pass this option if the function is called directly, and not via Commander.action.
   * We use this option in this package's `bin/build-packages.js` command,
   * in order to log a warning to consumers to use the `lg` command from @lg-tools/cli
   */
  direct?: boolean;
  verbose?: boolean;
}

/**
 * Builds packages using rollup for the current directory
 */
export function buildPackage({ direct }: BuildPackageOptions) {
  const packageDir = process.cwd();
  const localRollupConfigPath = path.join(packageDir, 'rollup.config.mjs');
  const defaultRollupConfigPath = path.join(
    __dirname, // __dirname is `dist`
    '../config/rollup.config.mjs',
  );

  const splitPath = packageDir.split('/');
  const packageName = splitPath[splitPath.length - 1];
  const scopeName = splitPath[splitPath.length - 2];

  if (direct && scopeName !== 'tools') {
    console.warn(
      'Building package using the `lg-build-package` command directly from `@lg-tools/build`.',
      'Consider using the global `lg build-package` command from `@lg-tools/cli` instead.',
    );
  }

  // If there is a local rollup config defined, use that
  // Otherwise use the default one
  const rollupConfigPath = fs.existsSync(localRollupConfigPath)
    ? localRollupConfigPath
    : defaultRollupConfigPath;

  console.log(
    chalk.bgGray(
      `Building \`${packageName}\` using rollup config: `,
      rollupConfigPath,
    ),
  );

  spawn('rollup', ['--config', rollupConfigPath], {
    cwd: packageDir,
    stdio: 'inherit',
  });
}
