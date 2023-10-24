import { ESLintUtils } from '../utils/typescript-eslint';

// export interface TSRuleContext<
//   TMessageIds extends string,
//   TOptions extends readonly unknown[],
// > extends TSESLint.RuleContext<TMessageIds, TOptions> {
//   // Pick<
//   //   Rule.RuleContext,
//   //   'cwd' | 'filename' | 'physicalFilename' | 'sourceCode'
//   // >
// }

// export type TSModuleCreateFn<
//   TMessageIds extends string,
//   TOptions extends readonly unknown[],
// > = (
//   context: Readonly<TSRuleContext<TMessageIds, TOptions>>,
// ) => TSESLint.RuleListener;

// export interface TSRuleModule<
//   TMessageIds extends string,
//   TOptions extends readonly unknown[],
// > extends TSESLint.RuleModule<TMessageIds, TOptions> {
//   // create: TSModuleCreateFn<TMessageIds, TOptions>;
// }

// export interface CreateRuleArgs<
//   TOptions extends readonly unknown[],
//   TMessageIds extends string,
// > extends Omit<ESLintUtils.RuleWithMeta<TOptions, TMessageIds>, 'create'> {
//   create: TSModuleCreateFn<TMessageIds, TOptions>;
// }

// /**
//  * Function to create a rule with the doc`s URL format.
//  * Creates a well-typed TSESLint custom ESLint rule with a docs URL.
//  *
//  * @returns Well-typed TSESLint custom ESLint rule.
//  */
// export const _createRule = <
//   TOptions extends readonly unknown[],
//   TMessageIds extends string,
// >(
//   args: TSRuleModule<TMessageIds, TOptions>, //CreateRuleArgs<TOptions, TMessageIds>,
// ): TSRuleModule<TMessageIds, TOptions> => {
//   return { ...args };
// };

export const createRule = ESLintUtils.RuleCreator(n => n);
