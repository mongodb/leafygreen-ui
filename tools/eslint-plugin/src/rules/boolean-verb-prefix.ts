import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import upperFirst from 'lodash/upperFirst';

import { createRule } from '../utils/createRule';
// import { deepOmit } from '../utils/deepOmit';
import { isTestFile } from '../utils/isTestFile';
import { RuleContext } from '../utils/RuleContext';

const verbs = ['is', 'are', 'has', 'should', 'did', 'does', 'will', 'use'];
const booleanComparators = ['===', '==', '>', '>=', '<', '<=', '!=', '!=='];

export const booleanVerbPrefixRule = createRule({
  name: 'boolean-verb-prefix',
  meta: {
    type: 'suggestion',
    hasSuggestions: true,
    messages: {
      ambiguousVariableName:
        'Ambiguous boolean variable `{{var}}`. Boolean variables must start with a verb',
      ambiguousKey:
        'Ambiguous type key `{{var}}`. Boolean props must start with a verb',
      addVerbIs: 'Prefix this variable with `is`',
    },
    schema: [
      {
        type: 'object',
        properties: {
          additionalVerbs: { type: 'array' },
          allowVarNames: { type: 'array' },
        },
        additionalProperties: false,
      },
    ],
    docs: {
      description: '',
    },
  },
  defaultOptions: [],
  create: context => {
    return {
      VariableDeclarator: node => {
        if (!isTestFile(context.filename)) {
          if (node.id.type === AST_NODE_TYPES.Identifier && node.init) {
            if (node.init.type === AST_NODE_TYPES.Literal) {
              if (typeof node.init.value === 'boolean') {
                lintBooleanDeclaration(context, node);
              }
            }

            if (
              node.init.type === AST_NODE_TYPES.BinaryExpression &&
              booleanComparators.includes(node.init.operator)
            ) {
              lintBooleanDeclaration(context, node);
            }
          }
        }
      },
      TSPropertySignature: node => {
        if (
          node.typeAnnotation?.typeAnnotation.type ===
          AST_NODE_TYPES.TSBooleanKeyword
        ) {
          lintInterfaceProperty(context, node);
        }
      },
    };
  },
});

/**
 * Merges default verbs with additional verbs from context
 */
function getVerbs(
  context: RuleContext<typeof booleanVerbPrefixRule>,
): Array<string> {
  return [
    ...verbs,
    // TODO:
    // ...(context.options[0]?.additionalVerbs ?? ([] as Array<string>)),
  ];
}

/** Returns the list of allowed variable names */
function getAllowedNames(
  context: RuleContext<typeof booleanVerbPrefixRule>,
): Array<string> {
  // console.log(context.options[0]?.allowVarNames);
  // TODO:
  //   return context.options[0]?.allowVarNames ?? [];
  return [];
}

function lintBooleanDeclaration(
  context: RuleContext<typeof booleanVerbPrefixRule>,
  node: TSESTree.VariableDeclarator,
) {
  const variableName = (node.id as TSESTree.Identifier).name;

  const startsWithVerb = getVerbs(context).some(verb =>
    variableName.startsWith(verb),
  );

  if (!startsWithVerb) {
    context.report({
      node,
      messageId: 'ambiguousVariableName',
      data: {
        var: variableName,
      },
      suggest: [
        {
          messageId: 'addVerbIs',
          fix: fixer => {
            return fixer.replaceText(node.id, `is${upperFirst(variableName)}`);
          },
        },
      ],
    });
  }
}

function lintInterfaceProperty(
  context: RuleContext<typeof booleanVerbPrefixRule>,
  node: TSESTree.TSPropertySignature,
) {
  const propName = (() => {
    if (node.key.type === AST_NODE_TYPES.Identifier) {
      return node.key.name;
    } else if (node.key.type === AST_NODE_TYPES.MemberExpression) {
      if (node.key.property.type === AST_NODE_TYPES.Identifier) {
        return node.key.property.name;
      }
    }
  })();

  if (propName) {
    const propNameStartsWithVerb = getVerbs(context).some(verb =>
      propName.startsWith(verb),
    );

    const isNameAllowed = getAllowedNames(context).includes(propName);

    if (!propNameStartsWithVerb && !isNameAllowed) {
      context.report({
        node,
        messageId: 'ambiguousKey',
        data: {
          var: propName,
        },
        suggest: [
          {
            messageId: 'addVerbIs',
            fix: fixer => {
              return fixer.replaceText(node.key, `is${upperFirst(propName)}`);
            },
          },
        ],
      });
    }
  }
}
