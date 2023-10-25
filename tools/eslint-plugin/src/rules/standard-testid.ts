/* eslint-disable no-console */
// import util from 'util';

import { TSESTree } from '@typescript-eslint/types';

// import snakeCase from 'lodash/snakeCase';
// import uniq from 'lodash/uniq';
import { createRule } from '../utils/createRule';
import { isTestFile } from '../utils/isTestFile';

export const standardTestidRule = createRule({
  name: 'standard-testid',
  meta: {
    type: 'suggestion',
    messages: {
      namespaced:
        'Hard-coded `data-testid` attributes should be namespaced with lg-',
      bem: 'Hard-coded `data-testid` attributes should match the component structure',
    },
    schema: [],
    docs: {
      description: '',
    },
    fixable: 'code',
  },
  defaultOptions: [],
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
  const value = (node.value as TSESTree.Literal)?.value;

  if (typeof value !== 'string') return;

  if (!value.startsWith('lg-')) {
    context.report({
      node,
      messageId: 'namespaced',
      fix: fixer => {
        return fixer.replaceText(
          node.value as TSESTree.StringLiteral,
          `"lg-${value}"`,
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
//       messageId: 'bem',
//       fix: fixer => {
//         return fixer.replaceText(
//           node.value as TSESTree.StringLiteral,
//           `"${expectedId}"`,
//         );
//       },
//     });
//   }
// }
