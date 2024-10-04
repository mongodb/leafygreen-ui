import type { API, FileInfo } from 'jscodeshift';

import {
  consolidateJSXAttributes,
  ConsolidateJSXAttributesOptions,
} from '../../utils/transformations';
import { addJSXAttributes } from '../../utils/transformations/addJSXAttributes';

type TransformerOptions = ConsolidateJSXAttributesOptions & {
  componentNames: Array<string>;
};

/**
 * Transformer function that:
 * 1. adds an explicit `usePortal` prop if left undefined
 * 2. consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop
 *
 * @param file the file to transform
 * @param jscodeshiftOptions an object containing at least a reference to the jscodeshift library
 * @param options an object containing options to pass to the transform function
 * @returns Either the modified file or the original file
 */
export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: TransformerOptions,
) {
  const source = j(file.source);

  const {
    propToRemove = 'usePortal',
    propToUpdate = 'renderMode',
    propMapping = {
      undefined: 'portal',
      false: 'inline',
      true: 'portal',
    },
    propToRemoveType = 'boolean',
    componentNames = [
      'Code',
      'Combobox',
      'DatePicker',
      'InfoSprinkle',
      'InlineDefinition',
      'Menu',
      'NumberInput',
      'Popover',
      'SearchInput',
      'Select',
      'SplitButton',
      'Tooltip',
    ],
  } = options;

  componentNames.forEach(componentName => {
    // Check if the element is on the page
    const elements = source.findJSXElements(componentName);

    // If there are no elements then return the original file
    if (elements.length === 0) return;

    elements.forEach(element => {
      addJSXAttributes({
        j,
        element,
        propName: propToRemove,
        propValue: true,
      });
      consolidateJSXAttributes({
        j,
        element,
        propToRemove,
        propToUpdate,
        propMapping,
        propToRemoveType,
      });
    });
  });

  return source.toSource();
}
