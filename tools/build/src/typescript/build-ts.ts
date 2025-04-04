/* eslint-disable no-console */
import chalk from 'chalk';
import fse from 'fs-extra';
import path from 'path';
import ts from 'typescript';
import { reportTypescriptDiagnostic } from './report-ts-diagnostic';

/**
 * Builds Typescript definitions for the current directory
 */
export function buildTypescript(
  passThru?: Array<string>,
  options?: Record<string, any>,
) {
  const { verbose } = options ?? { verbose: false };
  const packageDir = process.cwd();
  const tsConfigPath = path.join(packageDir, 'tsconfig.json');

  if (!fse.existsSync(tsConfigPath)) {
    console.error(chalk.red(`Could not find tsconfig in ${packageDir}`));
    process.exit(1);
  }

  verbose && console.log(chalk.blue('Building TypeScript'));

  // Read tsconfig.json
  const configFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);

  if (configFile.error) {
    reportTypescriptDiagnostic(configFile.error);
    process.exit(1);
  }
  verbose &&
    console.log(
      chalk.blue('  Loaded tsconfig.json: '),
      chalk.white(tsConfigPath),
      '\n',
      chalk.gray(JSON.stringify(configFile, null, 2)),
    );

  // Parse the config
  const parsedConfig = ts.parseJsonConfigFileContent(
    configFile.config,
    ts.sys,
    path.dirname(tsConfigPath),
  );

  if (parsedConfig.errors.length > 0) {
    parsedConfig.errors.forEach(reportTypescriptDiagnostic);
    process.exit(1);
  }

  // Create the program
  const program = ts.createProgram({
    rootNames: parsedConfig.fileNames,
    options: parsedConfig.options,
    projectReferences: parsedConfig.projectReferences,
  });

  // Emit output
  const emitResult = program.emit();

  // Report diagnostics
  const allDiagnostics = ts
    .getPreEmitDiagnostics(program)
    .concat(emitResult.diagnostics);

  if (verbose && allDiagnostics.length > 0) {
    allDiagnostics.forEach(reportTypescriptDiagnostic);
  }

  // Exit with appropriate code
  const hasErrors = allDiagnostics.some(
    diagnostic => diagnostic.category === ts.DiagnosticCategory.Error,
  );
  const exitCode = emitResult.emitSkipped || hasErrors ? 1 : 0;
  process.exit(exitCode);
}
