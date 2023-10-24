import { TSESLint } from '../utils/typescript-eslint';

import { testRule } from './test-rule';

const ruleTester = new TSESLint.RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('test-rule', testRule, {
  valid: [
    {
      code: 'const lgMyVar = 5;',
    },
  ],
  invalid: [
    {
      code: 'var invalidVariable = true',
      errors: [{ messageId: 'message-1' }],
    },
  ],
});
