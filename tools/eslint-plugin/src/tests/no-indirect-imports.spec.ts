import { noIndirectImportsRule } from '../rules/no-indirect-imports';

import { ruleTester } from './utils/ruleTester.testutils';

ruleTester.run(
  'tools/eslint-plugin/no-indirect-imports',
  noIndirectImportsRule,
  {
    valid: [
      {
        code: `import Button from '@leafygreen-ui/button'`,
      },
      {
        code: `import { Combobox } from '@leafygreen-ui/combobox'`,
      },
    ],
    invalid: [
      {
        code: `import Button from 'packages/button'`,
        output: `import Button from '@leafygreen-ui/button'`,
        errors: [
          {
            messageId: 'issue:importFromPackages',
          },
        ],
      },
      {
        code: `import Button from '../packages/button'`,
        output: `import Button from '@leafygreen-ui/button'`,
        errors: [
          {
            messageId: 'issue:importFromPackages',
          },
        ],
      },
      {
        code: `import { InternalToast } from 'src/InternalToast'`,
        output: `import { InternalToast } from '../InternalToast'`,
        filename: 'packages/toast/src/ToastContainer/ToastContainer.tsx',
        errors: [
          {
            messageId: 'issue:importFromSrc',
          },
        ],
      },
    ],
  },
);
