import { TSESTree } from '@typescript-eslint/types';

import { createRule } from '../utils/createRule';

export const noDuplicateIdsRule = createRule({
  name: 'no-duplicate-ids',
  meta: {
    type: 'suggestion',
    messages: {
      'issue:noDuplicateIds':
        'Do not reference the same lgid or testid in multiple places within a component',
    },
    schema: [],
    docs: {
      description:
        'Prevents duplicate lgid or testid usage within a component file',
    },
  },
  defaultOptions: [],
  create: context => {
    const seen: Record<
      'data-lgid' | 'data-testid',
      Record<string, TSESTree.JSXAttribute | undefined>
    > = {
      'data-lgid': {},
      'data-testid': {},
    };

    return {
      JSXAttribute(node) {
        if (node.name.type !== 'JSXIdentifier') {
          return;
        }

        const { name: attributeName } = node.name;

        if (attributeName !== 'data-lgid' && attributeName !== 'data-testid') {
          return;
        }

        if (
          node.value?.type !== 'JSXExpressionContainer' ||
          node.value.expression.type !== 'MemberExpression' ||
          node.value.expression.object.type !== 'Identifier' ||
          node.value.expression.object.name !== 'lgIds'
        ) {
          return;
        }

        const { property } = node.value.expression;

        const name =
          property.type === 'Identifier'
            ? property.name
            : property.type === 'Literal'
            ? property.value
            : undefined;

        if (typeof name === 'string') {
          const other = seen[attributeName][name];

          if (other) {
            context.report({
              node,
              messageId: 'issue:noDuplicateIds',
            });
          } else {
            seen[attributeName][name] = node;
          }
        }
      },
    };
  },
});
