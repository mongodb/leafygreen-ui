import path from 'path';
import fse from 'fs-extra';
import { Command } from 'commander';
import { camelCase, kebabCase, startCase } from 'lodash';

const cli = new Command('');
cli.argument('<rule-name>', 'The name of the rule');

cli.action(ruleName => {
  const rulesDir = path.resolve(__dirname, '../src/rules');
  const testsDir = path.resolve(__dirname, '../src/tests');

  const varName = camelCase(ruleName) + 'Rule';
  const kebabName = kebabCase(ruleName);
  const fileName = kebabCase(ruleName);

  const ruleTemplate = `
import { createRule } from '../utils/createRule';

export const ${varName} = createRule({
  name: '${kebabCase(ruleName)}',
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

ruleTester.run('${kebabName}', ${varName}, {
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
});

cli.parse();
