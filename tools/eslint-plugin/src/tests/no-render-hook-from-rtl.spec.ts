import { noRenderHookFromRtlRule } from '../rules/no-render-hook-from-rtl';

import { ruleTester } from './utils/ruleTester.testutils';

ruleTester.run('no-render-hook-from-rtl', noRenderHookFromRtlRule, {
  valid: [
    {
      code: `import { renderHook } from '@leafygreen-ui/testing-lib'`,
    },
    {
      code: `import { renderHook, RenderHookOptions, RenderHookResult } from '@leafygreen-ui/testing-lib'`,
    },
    {
      code: `import { renderHook, type RenderHookResult } from '@leafygreen-ui/testing-lib'`,
    },
  ],
  invalid: [
    // From RTL
    {
      code: `import { renderHook } from '@testing-library/react'`,
      output: `import { renderHook } from '@leafygreen-ui/testing-lib'`,
      errors: [
        {
          messageId: 'issue:noRenderHookFromRTL',
        },
      ],
    },
    // With types
    {
      code: `import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react'`,
      output: `import { renderHook, RenderHookOptions, RenderHookResult } from '@leafygreen-ui/testing-lib'`,
      errors: [
        {
          messageId: 'issue:noRenderHookFromRTL',
        },
      ],
    },
    // With types using 'type' keyword
    {
      code: `import { renderHook, type RenderHookResult } from '@testing-library/react'`,
      output: `import { renderHook, type RenderHookResult } from '@leafygreen-ui/testing-lib'`,
      errors: [
        {
          messageId: 'issue:noRenderHookFromRTL',
        },
      ],
    },
    // With additional valid imports;
    {
      code: `import { renderHook, screen } from '@testing-library/react'`,
      output: `import { screen } from '@testing-library/react';\nimport { renderHook } from '@leafygreen-ui/testing-lib';`,
      errors: [
        {
          messageId: 'issue:noRenderHookFromRTL',
        },
      ],
    },
    // From RTLHooks
    {
      code: `import { renderHook } from '@testing-library/react-hooks'`,
      output: `import { renderHook } from '@leafygreen-ui/testing-lib'`,
      errors: [
        {
          messageId: 'issue:noRenderHookFromRTLHooks',
        },
      ],
    },
    // With types imports
    {
      code: `import { renderHook, RenderHookOptions, RenderHookResult } from '@testing-library/react-hooks'`,
      output: `import { renderHook, RenderHookOptions, RenderHookResult } from '@leafygreen-ui/testing-lib'`,
      errors: [
        {
          messageId: 'issue:noRenderHookFromRTLHooks',
        },
      ],
    },
    // With types using 'type' keyword
    {
      code: `import { renderHook, type RenderHookResult } from '@testing-library/react-hooks'`,
      output: `import { renderHook, type RenderHookResult } from '@leafygreen-ui/testing-lib'`,
      errors: [
        {
          messageId: 'issue:noRenderHookFromRTLHooks',
        },
      ],
    },
  ],
});
