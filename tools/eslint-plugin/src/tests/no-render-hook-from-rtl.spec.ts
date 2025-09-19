
import { noRenderHookFromRtlRule } from '../rules/no-render-hook-from-rtl';

import { ruleTester } from './utils/ruleTester.testutils';

ruleTester.run('no-render-hook-from-rtl', noRenderHookFromRtlRule, {
  valid: [{
    code: ``, // valid code snippet
  }],
  invalid: [{
    code: ``, // code with lint errors
    // output: '', // fixed code
    errors: [{
      messageId: 'issue:noRenderHookFromRtl',
    }]
  }]
});
