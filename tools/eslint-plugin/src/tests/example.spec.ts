import { exampleRule } from '../rules/example';
import { ruleTester } from '../utils/ruleTester';

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
