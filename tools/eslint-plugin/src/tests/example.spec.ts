import { ruleTester } from '../utils/typescript-eslint';
import { exampleRule } from '../rules/example';

ruleTester.run('test-rule', exampleRule, {
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
