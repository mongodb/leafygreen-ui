/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';
import ts from 'typescript';
import { makeTypescriptDiagnosticReporter } from './makeTypescriptDiagnosticReporter';
import { parsePassThruOptions } from './parsePassThruOptions';
import { runTypescriptDownlevel } from './downlevel';

interface BuildTypescriptOptions {
  /** Whether to print verbose output*/
  verbose?: boolean;

  /**
   * Builds all TS downlevel targets based on the typesVersions field in package.json
   */
  downlevel?: boolean;
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

  verbose &&
    console.log(chalk.blue.bold(`Building TypeScript (v${ts.version})`));
  verbose && console.log(chalk.blue('Building TypeScript'));
  verbose && console.log(chalk.gray(tsConfigPath));

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

  if (options?.downlevel) {
    runTypescriptDownlevel({
      verbose,
    });
  }

  // Exit with appropriate code
  process.exit(exitStatus);
}
