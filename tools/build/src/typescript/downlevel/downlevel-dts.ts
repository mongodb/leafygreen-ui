/* eslint-disable no-console */
import chalk from 'chalk';
import path from 'path';
import fse from 'fs-extra';
// @ts-ignore - ironically, this package doesn't have types
import { main as downlevel } from 'downlevel-dts';

interface DownlevelDtsOptions {
  /** Whether to print verbose output */
  verbose?: boolean;

  /** Target TypeScript version for output */
  target?: `${number}.${number}`;

  /** Directory to output downleveled declaration files */
  outDir?: string;
}

/**
 * Runs downlevel-dts to create backward compatible TypeScript declaration files
 *
 * @param options Configuration options
 */
export async function downlevelDts(
  options?: DownlevelDtsOptions,
): Promise<void> {
  const { verbose, target = '3.4', outDir } = options ?? {};
  const packageDir = process.cwd();

  // Default to types directory if not specified
  const typesDirPath = path.resolve(packageDir, 'dist');

  // Default output directory
  const defaultOutDir = `ts${target}`;
  const outputDirPath = path.resolve(
    packageDir,
    `dist/${outDir ?? defaultOutDir}`,
  );

  // Ensure types directory exists
  if (!fse.existsSync(typesDirPath)) {
    console.error(chalk.red(`Types directory not found: ${typesDirPath}`));
    process.exit(1);
  }

  console.log(
    chalk.blue.bold(`Downleveling TypeScript declarations to TS ${target}`),
  );
  verbose && console.log(chalk.gray(`Input: ${typesDirPath}`));
  verbose && console.log(chalk.gray(`Output: ${outputDirPath}`));

  try {
    const semverTarget = target + '.0';
    downlevel(typesDirPath, outputDirPath, semverTarget);

    console.log(
      verbose &&
        chalk.green(
          `Successfully created downleveled declarations in ${outputDirPath}`,
        ),
    );
  } catch (error: any) {
    console.error(
      chalk.red(`Error downleveling declarations: ${error.message}`),
    );
    process.exit(1);
  }
}
