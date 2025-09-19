
import { createRule } from '../utils/createRule';

export const noRenderHookFromRtlRule = createRule({
  name: 'no-render-hook-from-rtl',
  meta: {
    type: 'suggestion',
    messages: {
      'issue:noRenderHookFromRtl': '',
    },
    schema: [],
    docs: {
      description: '',
    }
  },
  defaultOptions: [],
  create: context => {
    return {}
  }
});
