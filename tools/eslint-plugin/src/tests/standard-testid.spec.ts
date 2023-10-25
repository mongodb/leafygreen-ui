import { standardTestidRule } from '../rules/standard-testid';
import { ruleTester } from '../utils/ruleTester';

ruleTester.run('standard-testid', standardTestidRule, {
  valid: [
    {
      code: ``,
    },
  ],
  invalid: [
    {
      code: ``,
      errors: [
        {
          messageId: 'nonstandard',
        },
      ],
    },
  ],
});
