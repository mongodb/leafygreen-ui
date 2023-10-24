import { ruleTester } from '../utils/typescript-eslint';
import { testRule } from '../rules/test-rule';

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
