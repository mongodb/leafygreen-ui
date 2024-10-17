import { Command } from 'commander';
import fse from 'fs-extra';
import path from 'path';

import { buildRulesIndexFile } from './buildRulesIndex';
import {
  makeDefaultMessageId,
  makeFileName,
  makeId,
  makeVarName,
} from './utils';

const cli = new Command('');
cli.argument('<rule-name>', 'The name of the rule');
cli.action(createNewRule);
cli.parse(process.argv);

/**
 * Creates a new Rule within `eslint-plugin/src/rules`
 */
function createNewRule(ruleName: string) {
  const rulesDir = path.resolve(__dirname, '../src/rules');
  const testsDir = path.resolve(__dirname, '../src/tests');

  const varName = makeVarName(ruleName);
  const ruleId = makeId(ruleName);
  const fileName = makeFileName(ruleName);
  const msgId = makeDefaultMessageId(ruleName);

  const ruleTemplate = `
import { createRule } from '../utils/createRule';

export const ${varName} = createRule({
  name: '${ruleId}',
  meta: {
    type: 'suggestion',
    messages: {
      '${msgId}': '',
    },
    schema: [],
    docs: {
      description: '',
    }
  },
  defaultOptions: [],
  create: context => {
    return {}
  }
});
`;

  const testTemplate = `
import { ${varName} } from '../rules/${fileName}';

import { ruleTester } from './utils/ruleTester.testutils';

ruleTester.run('${ruleId}', ${varName}, {
  valid: [{
    code: \`\`, // valid code snippet
  }],
  invalid: [{
    code: \`\`, // code with lint errors
    // output: '', // fixed code
    errors: [{
      messageId: '${msgId}',
    }]
  }]
});
`;

  fse.writeFileSync(path.resolve(rulesDir, `${fileName}.ts`), ruleTemplate);
  fse.writeFileSync(
    path.resolve(testsDir, `${fileName}.spec.ts`),
    testTemplate,
  );
  buildRulesIndexFile();
}
