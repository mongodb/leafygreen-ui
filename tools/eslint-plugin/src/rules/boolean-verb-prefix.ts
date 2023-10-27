import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';
import upperFirst from 'lodash/upperFirst';

import { createRule } from '../utils/createRule';
// import { deepOmit } from '../utils/deepOmit';
import { isTestFile } from '../utils/isTestFile';
import { RuleContext } from '../utils/RuleContext';

const VERBS = ['is', 'are', 'has', 'should', 'did', 'does', 'will', 'use'];
const booleanComparators = ['===', '==', '>', '>=', '<', '<=', '!=', '!=='];

type BooleanVerbPrefixOptions = [
  {
    additionalVerbs: Array<string>;
    allowVarNames: Array<string>;
  },
];

type BooleanVerbPrefixMessages =
  | 'issue:ambiguousVariableName'
  | 'issue:ambiguousKey'
  | 'fix:addVerbIs';

export const booleanVerbPrefixRule = createRule<
  BooleanVerbPrefixOptions,
  BooleanVerbPrefixMessages
>({
  name: 'boolean-verb-prefix',
  meta: {
    docs: {
      description: `Enforce prefixing boolean variables & properties with a conditional verb`,
    },
    type: 'suggestion',
    hasSuggestions: true,
    messages: {
      'issue:ambiguousVariableName':
        'Ambiguous boolean variable `{{var}}`. Boolean variables must start with a verb',
      'issue:ambiguousKey':
        'Ambiguous type key `{{var}}`. Boolean props must start with a verb',
      'fix:addVerbIs': 'Prefix this variable with `is`',
    },
    schema: [
      {
        type: 'object',
        properties: {
          additionalVerbs: {
            type: 'array',
            description:
              'Additional verbs to allow as prefixes to boolean variable names',
            default: [],
          },
          allowVarNames: {
            type: 'array',
            description: 'Un-prefixed variable names that should be allowed',
            default: [],
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [
    {
      additionalVerbs: [],
      allowVarNames: [],
    },
  ],
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
  const additionalVerbs = context.options[0]?.additionalVerbs ?? [];
  return [...VERBS, ...additionalVerbs];
}

/** Returns the list of allowed variable names */
function getAllowedNames(
  context: RuleContext<typeof booleanVerbPrefixRule>,
): Array<string> {
  const allowVarNames = context.options[0]?.allowVarNames ?? [];
  return allowVarNames;
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
      messageId: 'issue:ambiguousVariableName',
      data: {
        var: variableName,
      },
      suggest: [
        {
          messageId: 'fix:addVerbIs',
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
        messageId: 'issue:ambiguousKey',
        data: {
          var: propName,
        },
        suggest: [
          {
            messageId: 'fix:addVerbIs',
            fix: fixer => {
              return fixer.replaceText(node.key, `is${upperFirst(propName)}`);
            },
          },
        ],
      });
    }
  }
}
