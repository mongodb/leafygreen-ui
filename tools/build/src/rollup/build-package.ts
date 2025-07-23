/* eslint-disable no-console */
import chalk from 'chalk';
import rollup, { type MergedRollupOptions } from 'rollup';
import {
  type BatchWarnings,
  type LoadConfigFile,
  loadConfigFile as _loadConfigFile,
} from 'rollup/loadConfigFile';

import { findRollupConfigFile } from './findRollupConfigFile';

const loadConfigFile = _loadConfigFile as LoadConfigFile;
import { bundleStats } from 'rollup-plugin-bundle-stats';

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
export function buildPackage({ verbose }: BuildPackageOptions) {
  const packageDir = process.cwd();

  const splitPath = packageDir.split('/');
  const packageName = splitPath[splitPath.length - 1];

  // If there is a local rollup config defined, use that
  // Otherwise use the default one
  const rollupConfigPath = findRollupConfigFile(packageName, { verbose });

  // load the rollup config file, and run rollup
  loadConfigFile(rollupConfigPath, {}).then(
    async ({
      options,
      warnings,
    }: {
      options: Array<MergedRollupOptions>;
      warnings: BatchWarnings;
    }) => {
      verbose &&
        console.log(
          `Building ${packageName} with the following config:`,
          options.map(config => ({
            input: config.input,
            output: config.output[0].dir ?? config.output[0].file,
          })),
        );

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
        const config: MergedRollupOptions = {
          ...optionsObj,
          logLevel: verbose ? 'debug' : 'warn',
        };

        // Log the bundle stats in verbose mode
        if (verbose) {
          config.plugins.push(
            bundleStats({
              html: false,
              json: false,
              compare: false,
            }),
          );
        }

        const bundle = await rollup.rollup(config);

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
