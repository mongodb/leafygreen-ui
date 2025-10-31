import { noDuplicateIdsRule } from '../rules/no-duplicate-ids';

import { ruleTester } from './utils/ruleTester.testutils';

ruleTester.run('no-duplicate-ids', noDuplicateIdsRule, {
  valid: [
    {
      code: `<div data-lgid={lgIds.root}><div data-lgid={lgIds.nested} /></div>`,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
    },
  ],
  invalid: [
    {
      code: `<div data-lgid={lgIds.root}><div data-lgid={lgIds.root} /></div>`,
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      errors: [
        {
          messageId: 'issue:noDuplicateIds',
        },
      ],
    },
  ],
});
