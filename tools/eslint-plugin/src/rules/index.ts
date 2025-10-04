/**
 * DO NOT MODIFY THIS FILE
 * ANY CHANGES WILL BE REMOVED ON THE NEXT BUILD
 * USE THE "create-rule" SCRIPT TO ADD NEW RULES INSTEAD
 */
import { noDuplicateIdsRule } from './no-duplicate-ids';
import { noIndirectImportsRule } from './no-indirect-imports';
import { noRenderHookFromRtlRule } from './no-render-hook-from-rtl';

export const rules = {
  'no-duplicate-ids': noDuplicateIdsRule,
  'no-indirect-imports': noIndirectImportsRule,
  'no-render-hook-from-rtl': noRenderHookFromRtlRule,
};
