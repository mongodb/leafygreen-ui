import { API, FileInfo, Options } from 'jscodeshift';

import { MigrateOptions } from '../..';
import { getImportSpecifiersForDeclaration } from '../../utils/imports';
import { replaceJSXAttributes } from '../../utils/transformations';

/**
 * Transformer function that will transform the Tabs component from v16 to v17
 * 1. Renames `selected` prop to `value`
 * 2. Renames `setSelected` prop to `onValueChange`
 *
 * @param file the file to transform
 * @param jscodeshiftOptions an object containing at least a reference to the jscodeshift library
 * @param options an object containing options to pass to the transform function
 * @returns Either the modified file or the original file
 */
export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  _options: MigrateOptions & Options,
) {
  const source = j(file.source);

  const tabsComponentNamesToTransform = getImportSpecifiersForDeclaration({
    j,
    source,
    packageName: '@leafygreen-ui/tabs',
    packageSpecifiersMap: {
      '@leafygreen-ui/tabs': 'Tabs',
    },
  });

  tabsComponentNamesToTransform.forEach(componentName => {
    const elements = source.findJSXElements(componentName);

    if (elements.length === 0) return;

    elements.forEach(element => {
      replaceJSXAttributes({
        j,
        element,
        propName: 'selected',
        newPropName: 'value',
      });

      replaceJSXAttributes({
        j,
        element,
        propName: 'setSelected',
        newPropName: 'onValueChange',
      });
    });
  });

  return source.toSource();
}
