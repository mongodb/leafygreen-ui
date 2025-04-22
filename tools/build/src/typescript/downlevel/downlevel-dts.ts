/* eslint-disable no-console */
import chalk from 'chalk';
// @ts-ignore - ironically, this package doesn't have types
import { main as downlevel } from 'downlevel-dts';
import fse from 'fs-extra';
import path from 'path';

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
 * This function is called from the command line as `lg build-ts --downlevel`
 *
 * @param options Configuration options
 */
export async function downlevelDts(
  options?: DownlevelDtsOptions,
): Promise<void> {
  const { verbose, target, outDir } = options ?? {};
  const packageDir = process.cwd();

  // Default to types directory if not specified
  const typesDirPath = path.resolve(packageDir, 'dist/types');

  // Default output directory
  const defaultOutDir = `ts${target}`;
  const outputDirPath = path.resolve(
    packageDir,
    `dist/${outDir ?? defaultOutDir}`,
  );

  // Ensure types directory exists
  if (!fse.existsSync(typesDirPath)) {
    console.error(chalk.red(`Types directory not found: ${typesDirPath}`));
    return;
  }

  // Remove existing downlevel directory
  fse.ensureDirSync(outputDirPath);
  fse.emptyDirSync(outputDirPath);

  console.log(
    chalk.blue.bold(`Downlevelling TypeScript declarations to TS${target}`),
  );
  verbose && console.log(chalk.gray(`Input: ${typesDirPath}`));
  verbose && console.log(chalk.gray(`Output: ${outputDirPath}`));

  try {
    const semverTarget = target + '.0';
    downlevel(typesDirPath, outputDirPath, semverTarget);

    verbose &&
      console.log(
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
