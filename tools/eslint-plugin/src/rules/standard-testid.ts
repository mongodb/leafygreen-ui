import { TSESTree } from '@typescript-eslint/types';

import { createRule } from '../utils/createRule';
import { isTestFile } from '../utils/isTestFile';

const PREFIX = 'lg-';

export const standardTestidRule = createRule({
  name: 'standard-testid',
  meta: {
    docs: {
      description:
        'Enforce a consistent prefix for hard-coded `data-testid` attributes',
    },
    fixable: 'code',
    type: 'suggestion',
    messages: {
      'issue:namespace':
        'Hard-coded `data-testid` attributes should be namespaced with {{prefix}}',
      'issue:structure':
        'Hard-coded `data-testid` attributes should match the component structure',
    },
    schema: [
      {
        type: 'object',
        properties: {
          prefix: {
            type: 'string',
            description: 'Prefix for `data-testid` attributes',
            default: PREFIX,
          },
        },
      },
    ],
  },
  defaultOptions: [
    {
      prefix: PREFIX,
    },
  ],
  create: context => {
    return {
      JSXAttribute: node => {
        const nodeName = node.name.name;
        const value = (node.value as TSESTree.Literal)?.value;

        if (typeof value !== 'string') {
          return;
        }

        if (nodeName === 'data-testid' && !isTestFile(context.filename)) {
          lintTestIdPrefix(context, node);
        }
      },
    };
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars

type ThisRuleContext = Parameters<(typeof standardTestidRule)['create']>[0];

/**
 * Checks whether the `data-testid` attribute starts with `lg-`
 */
function lintTestIdPrefix(
  context: ThisRuleContext,
  node: TSESTree.JSXAttribute,
) {
  const prefix = context.options[0].prefix;
  const value = (node.value as TSESTree.Literal)?.value;

  if (typeof value !== 'string') return;

  if (!value.startsWith(prefix)) {
    context.report({
      node,
      messageId: 'issue:namespace',
      fix: fixer => {
        return fixer.replaceText(
          node.value as TSESTree.StringLiteral,
          `"${prefix}${value}"`,
        );
      },
    });
  }
}

/**
 * Checks whether the `data-testid` attribute is named according to its file path
 */
// function lintTestIdStructure(
//   context: ThisRuleContext,
//   node: TSESTree.JSXAttribute,
// ) {
//   const value = (node.value as TSESTree.Literal)?.value;

//   if (typeof value !== 'string') return;

//   const relativePath = context.filename.split('packages')[1];
//   const pathSegments = uniq(
//     relativePath
//       .split('/')
//       .filter(segment => segment.length > 0 && segment !== 'src')
//       .map(segment => segment.replace(/(\.tsx$)/, ''))
//       .map(segment => snakeCase(segment)),
//   );

//   const expectedId = ['lg', ...pathSegments].join('-');

//   if (!value.startsWith(expectedId)) {
//     context.report({
//       node,
//       messageId: 'issue:structure',
//       fix: fixer => {
//         return fixer.replaceText(
//           node.value as TSESTree.StringLiteral,
//           `"${expectedId}"`,
//         );
//       },
//     });
//   }
// }
