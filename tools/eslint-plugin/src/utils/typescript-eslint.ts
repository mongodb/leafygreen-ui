/**
 * NOTE: This is likely the wrong version of `@typescript-eslint/utils`
 * We want ^6.9.0, but this is importing ^5.60.0
 */
import { ESLintUtils, TSESLint } from '@typescript-eslint/utils/dist';

export { ESLintUtils, TSESLint };

export const ruleTester = new TSESLint.RuleTester({
  parser: '@typescript-eslint/parser',
});
