/* eslint-disable no-console */
import chalk from 'chalk';
import ts from 'typescript';
/**
 * Helper function to report diagnostic messages
 */

export function makeTypescriptDiagnosticReporter(verbose?: boolean) {
  return function reportTypescriptDiagnostic(diagnostic: ts.Diagnostic): void {
    const msg = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

    const isError = diagnostic.category === ts.DiagnosticCategory.Error;
    const isWarning = diagnostic.category === ts.DiagnosticCategory.Warning;

    // Only show non-errors in verbose
    if (!verbose && !(isError || isWarning)) {
      return;
    }

    let message = msg;

    if (diagnostic.file && diagnostic.start !== undefined) {
      const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
        diagnostic.start,
      );
      const l = line + 1;
      const c = character + 1;
      message = `${diagnostic.file.fileName} (${l},${c}): ${msg}`;
    }

    const msgColor = isError
      ? chalk.red
      : isWarning
      ? chalk.yellow
      : chalk.gray;

    console.log(msgColor(message));
  };
}
