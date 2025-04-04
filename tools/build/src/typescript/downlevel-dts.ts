/* eslint-disable no-console */
import chalk from 'chalk';
import path from 'path';
import fse from 'fs-extra';
import { sync as spawnSync } from 'cross-spawn';

interface DownlevelDtsOptions {
  /** Whether to print verbose output */
  verbose?: boolean;

  /** Target TypeScript version for output */
  target?: string;

  /** Directory to output downleveled declaration files */
  outDir?: string;
}

/**
 * Runs downlevel-dts to create backward compatible TypeScript declaration files
 *
 * @param options Configuration options
 */
export function downlevelDts(options?: DownlevelDtsOptions): void {
  const { verbose, target = '3.4', outDir } = options ?? {};
  const packageDir = process.cwd();

  // Default to types directory if not specified
  const typesDirPath = path.resolve(packageDir, 'dist');

  // Default output directory
  const defaultOutDir = `dist/ts${target}`;
  const outputDirPath = path.resolve(packageDir, outDir ?? defaultOutDir);

  // Ensure types directory exists
  if (!fse.existsSync(typesDirPath)) {
    console.error(chalk.red(`Types directory not found: ${typesDirPath}`));
    process.exit(1);
  }

  verbose &&
    console.log(
      chalk.blue(`Downleveling TypeScript declarations to TS ${target}`),
    );
  verbose && console.log(chalk.gray(`Input: ${typesDirPath}`));
  verbose && console.log(chalk.gray(`Output: ${outputDirPath}`));

  try {
    // Ensure downlevel-dts is installed
    verbose && console.log(chalk.blueBright('Checking for downlevel-dts...'));

    const checkResult = checkForDownlevelDts();

    if (checkResult.status !== 0) {
      verbose &&
        console.log(chalk.yellow('downlevel-dts not found, installing...'));

      const installResult = installDownlevelDts();

      if (installResult.status !== 0) {
        throw new Error(
          `Failed to install downlevel-dts, exit code: ${installResult.status}`,
        );
      }
    }

    // Run downlevel-dts
    const args = ['downlevel-dts', typesDirPath, outputDirPath, '--to', target];

    verbose && console.log(chalk.gray(`Running: npx ${args.join(' ')}`));

    const result = spawnSync('npx', args, {
      stdio: verbose ? 'inherit' : 'pipe',
    });

    if (result.status !== 0) {
      throw new Error(`downlevel-dts failed with exit code: ${result.status}`);
    }

    console.log(
      verbose &&
        chalk.green(
          `Successfully created downleveled declarations in ${outputDirPath}`,
        ),
    );
  } catch (error: any) {
    throw new Error(`Error downleveling declarations: ${error.message}`);
  }

  function checkForDownlevelDts() {
    return spawnSync('npx', ['--no-install', 'downlevel-dts', '--version']);
  }

  function installDownlevelDts() {
    return spawnSync('npm', ['install', '--no-save', 'downlevel-dts']);
  }
}
