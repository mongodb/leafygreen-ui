import { RuleTester } from 'eslint';

import { testRule } from './test-rule';

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
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
      errors: [{ message: 'Variable names must start with lg' }],
    },
  ],
});
