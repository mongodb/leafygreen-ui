// importing directly from the relative `node_modules` directory,
// since `@typescript-eslint/utils` resolves to the wrong version
import {
  ESLintUtils,
  TSESLint,
} from 'node_modules/@typescript-eslint/utils/dist';

export { ESLintUtils, TSESLint };

export const ruleTester = new TSESLint.RuleTester({
  parser: '@typescript-eslint/parser',
});
