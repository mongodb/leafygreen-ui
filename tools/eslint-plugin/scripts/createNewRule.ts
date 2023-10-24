import path from 'path';
import { Command } from 'commander';
import fse from 'fs-extra';
import { buildRulesIndexFile } from './buildRulesIndex';
import { makeFileName, makeId, makeVarName } from './utils';

const cli = new Command('');
cli.argument('<rule-name>', 'The name of the rule');
cli.action(createNewRule);
cli.parse();

function createNewRule(ruleName: string) {
  const rulesDir = path.resolve(__dirname, '../src/rules');
  const testsDir = path.resolve(__dirname, '../src/tests');

  const varName = makeVarName(ruleName);
  const ruleId = makeId(ruleName);
  const fileName = makeFileName(ruleName);

  const ruleTemplate = `
import { createRule } from '../utils/createRule';

export const ${varName} = createRule({
  name: '${ruleId}',
  meta: {
    type: 'suggestion',
    messages: {},
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
import { ruleTester } from '../utils/typescript-eslint';

import { ${varName} } from '../rules/${fileName}';

ruleTester.run('${ruleId}', ${varName}, {
  valid: [{
    code: \`\`,
  }],
  invalid: [{
    code: \`\`,
    errors: [{}]
  }]
})
`;

  fse.writeFileSync(path.resolve(rulesDir, `${fileName}.ts`), ruleTemplate);
  fse.writeFileSync(
    path.resolve(testsDir, `${fileName}.spec.ts`),
    testTemplate,
  );
  buildRulesIndexFile();
}
