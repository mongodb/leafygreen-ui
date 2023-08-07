/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';
import rollup, { type MergedRollupOptions } from 'rollup';
import {
  type BatchWarnings,
  type LoadConfigFile,
} from 'rollup/dist/loadConfigFile';
// @ts-expect-error - type declaration incorrectly defined
import { loadConfigFile } from 'rollup/loadConfigFile';

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
export function buildPackage({ direct, verbose }: BuildPackageOptions) {
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
  const rollupConfigPath = fse.existsSync(localRollupConfigPath)
    ? localRollupConfigPath
    : defaultRollupConfigPath;

  if (fse.existsSync(localRollupConfigPath)) {
    console.log(
      chalk.bgGray(
        `Building ${chalk.bold(packageName)} using local rollup config:`,
        localRollupConfigPath,
      ),
    );
  }

  // load the rollup config file, and run rollup
  (loadConfigFile as LoadConfigFile)(rollupConfigPath, {}).then(
    async ({
      options,
      warnings,
    }: {
      options: Array<MergedRollupOptions>;
      warnings: BatchWarnings;
    }) => {
      if (warnings.count > 0) {
        if (verbose) {
          // This prints all deferred warnings
          warnings.flush();
        } else {
          console.log(
            warnings.count + ' build warnings. Run with `--verbose` for more',
          );
        }
      }

      for (const optionsObj of options) {
        const bundle = await rollup.rollup({
          ...optionsObj,
          logLevel: verbose ? 'debug' : 'warn',
        });
        verbose &&
          console.log(
            `${chalk.bold(optionsObj.input)} > ${chalk.bold(
              optionsObj.output.map(obj => obj.dir || obj.file),
            )}`,
          );
        await Promise.all(optionsObj.output.map(bundle.write));
      }
    },
  );
}
