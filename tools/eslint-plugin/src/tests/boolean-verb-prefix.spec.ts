import { booleanVerbPrefixRule } from '../rules/boolean-verb-prefix';
import { ruleTester } from '../utils/ruleTester';

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
  ],
  invalid: [
    {
      code: `const disabled = false`,
      errors: [
        {
          messageId: 'ambiguousVariableName',
          suggestions: [
            { messageId: 'addVerbIs', output: `const isDisabled = false` },
          ],
        },
      ],
    },
  ],
});
