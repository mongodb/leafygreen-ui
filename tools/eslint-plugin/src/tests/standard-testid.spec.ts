import { standardTestidRule } from '../rules/standard-testid';

import { ruleTester } from './utils/ruleTester.testutils';

ruleTester.run('tools/eslint-plugin/standard-testid', standardTestidRule, {
  valid: [
    {
      code: `<div data-testid="lg-some-id" />`,
    },
  ],
  invalid: [
    {
      code: `<div data-testid="some-id" />`,
      output: `<div data-testid="lg-some-id" />`,
      errors: [
        {
          messageId: 'issue:namespace',
        },
      ],
    },
  ],
});
