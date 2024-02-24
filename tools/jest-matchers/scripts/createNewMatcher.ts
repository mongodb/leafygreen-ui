import chalk from 'chalk';
import { Command } from 'commander';
import fse from 'fs-extra';
import { camelCase, lowerFirst } from 'lodash';
import path from 'path';

const cli = new Command();
cli
  .argument('<matcher-name>', 'The name of the new matcher')
  .action(createNewMatcher)
  .parse();

function createNewMatcher(matcherName: string) {
  matcherName = lowerFirst(camelCase(matcherName));

  if (!matcherName.startsWith('to')) {
    console.warn(
      chalk.yellow(
        `Matcher names should start with the word "to". Received \`${matcherName}\``,
      ),
    );
  }

  const matchersDir = path.resolve(__dirname, '../src/matchers');

  /** Create the matcher file */
  const matchersFilePath = path.resolve(matchersDir, matcherName + '.ts');
  const matcherFileTemplate = `
import { createMatcher } from '../utils/createMatcher';

export const ${matcherName} = createMatcher(function _${matcherName}() {
  return {
    pass: true,
    message: () => '',
  };
});
`;
  fse.writeFileSync(matchersFilePath, matcherFileTemplate);

  /** Create the test file */

  const testFilePath = path.resolve(
    __dirname,
    '../src/tests',
    matcherName + '.spec.ts',
  );

  const testFileTemplate = `
describe('tools/jest-matchers/.${matcherName}', () => {
  test.todo('')
})
`;
  fse.writeFileSync(testFilePath, testFileTemplate);

  /** Update the matchers index file */
  const indexFilePath = path.resolve(matchersDir, 'index.ts');
  let indexContents = fse.readFileSync(indexFilePath, 'utf-8');
  indexContents += `export { ${matcherName} } from './${matcherName}';\n`;
  fse.writeFileSync(indexFilePath, indexContents);
}
