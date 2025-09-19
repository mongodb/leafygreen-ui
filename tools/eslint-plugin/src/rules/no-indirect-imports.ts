import { createRule } from '../utils/createRule';

export const noIndirectImportsRule = createRule({
  name: 'no-indirect-imports',
  meta: {
    type: 'problem',
    fixable: 'code',
    docs: {
      description: 'Forbid indirect imports from `src/` or `packages/`',
    },
    messages: {
      'issue:importFromPackages':
        'Do not import @leafygreen-ui packages from the `packages` directory',
      'issue:importFromSrc':
        "Do not import @leafygreen-ui from a package's `src` directory",
    },
    schema: [],
  },
  defaultOptions: [],
  create: context => {
    return {
      ImportDeclaration: node => {
        const importSource = node.source.value;

        const isImportingFromPackages = importSource.includes('packages/');
        const isImportingFromSrc = importSource.startsWith('src/');

        if (isImportingFromPackages) {
          context.report({
            node,
            messageId: 'issue:importFromPackages',
            fix: fixer =>
              fixer.replaceText(
                node.source,
                `'${importSource.replace(
                  /(\.+\/)*packages/g,
                  '@leafygreen-ui',
                )}'`,
              ),
          });
        }

        if (isImportingFromSrc) {
          const relativePath = context.filename.split('src/')[1];
          const levelsToSrc = relativePath.split('/').length - 1;

          const pathToSource =
            levelsToSrc > 0
              ? new Array(levelsToSrc).fill('../').join('')
              : './';

          context.report({
            node,
            messageId: 'issue:importFromSrc',
            fix: fixer =>
              fixer.replaceText(
                node.source,
                `'${importSource.replace('src/', pathToSource)}'`,
              ),
          });
        }
      },
    };
  },
});
