/* eslint-disable no-console */
import { Rule } from 'eslint';

export const testRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
  },
  create: (context: Rule.RuleContext): Rule.RuleListener => {
    return {
      VariableDeclaration(node) {
        console.log(node);
        const vars = context.sourceCode.getDeclaredVariables(node);
        console.log(vars);

        for (const _var of vars) {
          if (!_var.name.startsWith('lg')) {
            context.report({
              node,
              message: 'Variable names must start with lg',
            });
          }
        }
      },
    };
  },
};
