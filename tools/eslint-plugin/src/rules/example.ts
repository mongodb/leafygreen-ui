/* eslint-disable no-console */
// import { hasProp } from 'jsx-ast-utils';
import { createRule } from '../utils/createRule';

export const exampleRule = createRule({
  name: 'example',
  meta: {
    type: 'suggestion',
    messages: {
      'message-1': '',
    },
    schema: [],
    docs: {
      description: 'A test rule',
    },
  },
  defaultOptions: [],
  create: context => {
    return {
      // VariableDeclaration: node => {
      //   // const vars = context.sourceCode.getDeclaredVariables(node);
      //   console.dir({
      //     ...node,

      //     declarations: node.declarations[0],
      //   });

      //   process.exit();

      //   // for (const _var of vars) {
      //   //   if (!_var.name.startsWith('lg')) {
      //   //     context.report({
      //   //       node,
      //   //       message: 'Variable names must start with lg',
      //   //     });
      //   //   }
      //   // }
      // },
      JSXOpeningElement: node => {
        const attributes = node.attributes;

        if (attributes.length > 0) {
          const sourceCode = context.sourceCode;
          console.log({ node, attributes, sourceCode });
          process.exit();
        }

        // if (onChange) {
        //   context.report({
        //     node,
        //     message: `No onChange!`,
        //   });
        // }
      },
    };
  },
});
