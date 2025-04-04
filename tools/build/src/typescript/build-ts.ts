/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';
import ts from 'typescript';
import { downlevelDts } from './downlevel-dts';
import { makeTypescriptDiagnosticReporter } from './makeTypescriptDiagnosticReporter';
import { parsePassThruOptions } from './parsePassThruOptions';

interface BuildTypescriptOptions {
  /** Whether to print verbose output*/
  verbose?: boolean;

  /**
   * Whether to build for production
   * This builds all TS downlevel targets
   */
  production?: boolean;
}

/**
 * Builds Typescript definitions for the current directory
 */
export function buildTypescript(
  passThru?: Array<string>,
  options?: BuildTypescriptOptions,
) {
  const { verbose } = options ?? { verbose: false };
  const packageDir = process.cwd();
  const tsConfigPath = path.join(packageDir, 'tsconfig.json');

  if (!fse.existsSync(tsConfigPath)) {
    console.error(chalk.red(`Could not find tsconfig in ${packageDir}`));
    process.exit(1);
  }

  verbose && console.log(chalk.blue.bold('Building TypeScript'));

  // Any additional options passed in via the CLI
  const cliCompilerOptions = parsePassThruOptions(passThru);
  const reportTypescriptDiagnostic = makeTypescriptDiagnosticReporter(verbose);

  // Create a Solution Builder Host to properly handle --build functionality
  const buildHost = ts.createSolutionBuilderHost(
    ts.sys, // system
    ts.createEmitAndSemanticDiagnosticsBuilderProgram, // createProgram
    reportTypescriptDiagnostic, // reportDiagnostic
    reportTypescriptDiagnostic, // reportSolutionBuilderStatus
    verbose ? message => console.log(chalk.gray(message)) : undefined, // reportErrorSummary
  );

  // Create a Solution Builder (equivalent to tsc --build)
  const builder = ts.createSolutionBuilder(buildHost, [tsConfigPath], {
    ...cliCompilerOptions,
    verbose: verbose,
  });

  // Build the project
  const exitStatus = builder.build();

  if (options?.production) {
    verbose &&
      console.log(chalk.blue.bold('Building TypeScript for production'));

    const packageJson = fse.readJSONSync(
      path.join(packageDir, 'package.json'),
      'utf-8',
    );
    const typesVersions = packageJson?.typesVersions;
    const downlevelVersions = getTypeVersions(typesVersions);

    if (downlevelVersions) {
      downlevelVersions.forEach(target => {
        downlevelDts({ verbose, target });
      });
    } else {
      verbose &&
        console.log(chalk.yellow('No typesVersions found in package.json'));
    }
  }

  // Exit with appropriate code
  process.exit(exitStatus);
}

/**
 * Extracts TypeScript versions from the typesVersions field in package.json
 * and returns an array of version numbers without the 'ts' prefix.
 * @returns
 */
const getTypeVersions = (typesVersions?: {
  [target: string]: {
    [files: string]: string[];
  };
}): Array<string> | undefined => {
  if (!typesVersions || typeof typesVersions !== 'object') return;

  const versions: Array<string> = [];

  Object.entries(typesVersions).forEach(([_versionRange, pathMappings]) => {
    // Get the output directory from the path mappings
    // Typical format is { '*': ['ts3.4/*'] }
    if (!pathMappings || typeof pathMappings !== 'object') return;

    const wildcardMapping = pathMappings['*'];
    if (!Array.isArray(wildcardMapping) || wildcardMapping.length === 0) return;

    // Extract outputDir from format like 'ts3.4/*'
    const outputDirMatch = wildcardMapping[0].match(/^ts([\d.]+)\/\*/);
    if (!outputDirMatch || !outputDirMatch[1]) return;

    // Get just the version number without the 'ts' prefix
    const versionNumber = outputDirMatch[1];
    versions.push(versionNumber);
  });

  return versions;
};
