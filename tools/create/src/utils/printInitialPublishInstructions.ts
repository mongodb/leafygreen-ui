/* eslint-disable no-console */
import chalk from 'chalk';

export function printInitialPublishInstructions() {
  console.log(`
${chalk.yellow.bold('⚠️  Manual first publish required')}
You must manually publish the first version before automated releases can take over.
See ${chalk.cyan('README.md#initial-release')} for instructions.
`);
}
