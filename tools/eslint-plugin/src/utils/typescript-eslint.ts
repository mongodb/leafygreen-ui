/**
 * NOTE: This is likely the wrong version of `@typescript-eslint/utils`
 * We want ^6.9.0, but this is importing ^5.60.0
 */
import { RuleTester } from '@typescript-eslint/rule-tester';
import { ESLintUtils, TSESLint } from '@typescript-eslint/utils';

export { ESLintUtils, TSESLint };

export const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});
