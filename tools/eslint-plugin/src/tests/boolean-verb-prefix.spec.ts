import { booleanVerbPrefixRule } from '../rules/boolean-verb-prefix';

import { ruleTester } from './utils/ruleTester.testutils';

ruleTester.run('boolean-verb-prefix', booleanVerbPrefixRule, {
  valid: [
    {
      code: `const isDisabled = false`,
    },
    {
      code: `const isDisabled = getDisabled()`,
    },
    {
      code: `const hasLabel = !!label`,
    },
    {
      code: `interface MyInterface { isDisabled: boolean; }`,
    },
  ],
  invalid: [
    {
      code: `const disabled = false`,
      errors: [
        {
          messageId: 'issue:ambiguousVariableName',
          suggestions: [
            { messageId: 'fix:addVerbIs', output: `const isDisabled = false` },
          ],
        },
      ],
    },
    {
      code: `interface MyInterface { disabled: boolean; }`,
      errors: [
        {
          messageId: 'issue:ambiguousKey',
          suggestions: [
            {
              messageId: 'fix:addVerbIs',
              output: `interface MyInterface { isDisabled: boolean; }`,
            },
          ],
        },
      ],
    },
  ],
});
