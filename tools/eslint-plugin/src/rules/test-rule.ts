/* eslint-disable no-console */
import { hasProp } from 'jsx-ast-utils';

import { JSXRuleModule } from '../types/rules';

export const testRule: JSXRuleModule = {
  meta: {
    type: 'suggestion',
  },
  create: context => {
    return {
      VariableDeclaration: node => {
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
      JSXOpeningElement: node => {
        const onChange = hasProp(node.attributes, 'onChange');

        if (onChange) {
          context.report({
            node,
            message: `No onChange!`,
          });
        }
      },
    };
  },
};
