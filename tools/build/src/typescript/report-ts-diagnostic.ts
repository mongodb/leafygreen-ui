import chalk from 'chalk';
import ts from 'typescript';
/**
 * Helper function to report diagnostic messages
 */
export function reportTypescriptDiagnostic(diagnostic: ts.Diagnostic): void {
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
  if (diagnostic.file && diagnostic.start !== undefined) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(
      diagnostic.start,
    );
    console.error(
      chalk.red(
        `${diagnostic.file.fileName} (${line + 1},${
          character + 1
        }): ${message}`,
      ),
    );
  } else {
    console.error(chalk.red(message));
  }
}
