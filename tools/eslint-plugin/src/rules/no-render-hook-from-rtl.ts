import { AST_NODE_TYPES } from '@typescript-eslint/types';

import { createRule } from '../utils/createRule';

/** import sources that we need to check */
const invalidImportSources = {
  RTL: '@testing-library/react',
  RTLHooks: '@testing-library/react-hooks',
} as const;

/** import specifiers disallowed from the invalid sources */
const RTLHooksSpecifiers = [
  'renderHook',
  'RenderHookOptions',
  'RenderHookResult',
];

export const noRenderHookFromRtlRule = createRule({
  name: 'no-render-hook-from-rtl',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description:
        'Disallow importing `renderHook` or related types from `@testing-library/react` or `@testing-library/react-hooks`.',
    },
    messages: {
      'issue:noRenderHookFromRTL':
        'Importing `renderHook` or related types from `@testing-library/react` is not allowed. Please import from `@leafygreen-ui/testing-lib` instead.',
      'issue:noRenderHookFromRTLHooks':
        'Importing `renderHook` or related types from `@testing-library/react-hooks` is not allowed. Please import from `@leafygreen-ui/testing-lib` instead.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    return {
      ImportDeclaration: node => {
        const importSource = node.source.value;

        const isImportingFromIncorrectSource =
          importSource === invalidImportSources.RTL ||
          importSource === invalidImportSources.RTLHooks;

        // Find any disallowed import specifiers
        const disallowedSpecifiers = node.specifiers.filter(
          specifier =>
            specifier.type === AST_NODE_TYPES.ImportSpecifier &&
            specifier.imported.type === AST_NODE_TYPES.Identifier &&
            RTLHooksSpecifiers.includes(specifier.imported.name),
        );

        if (isImportingFromIncorrectSource && disallowedSpecifiers.length > 0) {
          const messageId =
            importSource === invalidImportSources.RTLHooks
              ? 'issue:noRenderHookFromRTLHooks'
              : 'issue:noRenderHookFromRTL';

          context.report({
            node,
            messageId,
            fix: fixer => {
              const allowedSpecifiers = node.specifiers.filter(
                specifier => !disallowedSpecifiers.includes(specifier),
              );

              if (allowedSpecifiers.length === 0) {
                // If all imports are disallowed, replace the import source
                return fixer.replaceText(
                  node.source,
                  `'@leafygreen-ui/testing-lib'`,
                );
              } else {
                // If there are other imports, keep them and add a separate import for disallowed ones
                const allowedImports = allowedSpecifiers
                  .map(spec => {
                    if (spec.type === AST_NODE_TYPES.ImportSpecifier) {
                      const importedName =
                        spec.imported.type === AST_NODE_TYPES.Identifier
                          ? spec.imported.name
                          : spec.imported.value;
                      return importedName === spec.local.name
                        ? spec.local.name
                        : `${importedName} as ${spec.local.name}`;
                    }

                    return spec.local.name;
                  })
                  .join(', ');

                const disallowedImports = disallowedSpecifiers
                  .map(spec => {
                    if (spec.type === AST_NODE_TYPES.ImportSpecifier) {
                      const importedName =
                        spec.imported.type === AST_NODE_TYPES.Identifier
                          ? spec.imported.name
                          : spec.imported.value;
                      return importedName === spec.local.name
                        ? spec.local.name
                        : `${importedName} as ${spec.local.name}`;
                    }

                    return spec.local.name;
                  })
                  .join(', ');

                const newImportStatement = `import { ${allowedImports} } from ${node.source.raw};\nimport { ${disallowedImports} } from '@leafygreen-ui/testing-lib';`;
                return fixer.replaceText(node, newImportStatement);
              }
            },
          });
        }
      },
    };
  },
});
