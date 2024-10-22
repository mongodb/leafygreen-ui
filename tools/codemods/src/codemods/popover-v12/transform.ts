import type { API, FileInfo } from 'jscodeshift';

import {
  addJSXAttributes,
  consolidateJSXAttributes,
  removeJSXAttributes,
} from '../../utils/transformations';

const componentNamesForConsolidation = [
  'Combobox',
  'Menu',
  'Popover',
  'Select',
  'SplitButton',
  'Tooltip',
];

const propNamesToRemove = [
  'popoverZIndex',
  'portalClassName',
  'portalContainer',
  'portalRef',
  'scrollContainer',
  'usePortal',
];

const componentNamesWithPropsToRemoveMap: Record<string, Array<string>> = {
  Code: propNamesToRemove.filter(propName => propName !== 'portalRef'),
  Copyable: ['shouldTooltipUsePortal'],
  DatePicker: propNamesToRemove.filter(propName => propName !== 'usePortal'),
  GuideCue: propNamesToRemove.filter(propName => propName !== 'usePortal'),
  InfoSprinkle: propNamesToRemove,
  InlineDefinition: propNamesToRemove,
  NumberInput: propNamesToRemove,
  SearchInput: propNamesToRemove.filter(
    propName => propName !== 'popoverZIndex',
  ),
};

/**
 * Transformer function that:
 * 1. Adds an explicit `usePortal={true}` declaration if left undefined and consolidates the `usePortal` and `renderMode` props into a single `renderMode` prop for the following components:
 * - `Combobox`
 * - `Menu`
 * - `Popover`
 * - `Select`
 * - `SplitButton`
 * - `Tooltip`
 * 2. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from the following components:
 * - `Code`
 * - `DatePicker`
 * - `GuideCue`
 * - `InfoSprinkle`
 * - `InlineDefinition`
 * - `NumberInput`
 * - `SearchInput`
 * 3. Removes `shouldTooltipUsePortal` prop from `Copyable` component
 *
 * @param file the file to transform
 * @param jscodeshiftOptions an object containing at least a reference to the jscodeshift library
 * @param options an object containing options to pass to the transform function
 * @returns Either the modified file or the original file
 */
export default function transformer(file: FileInfo, { jscodeshift: j }: API) {
  const source = j(file.source);

  componentNamesForConsolidation.forEach(componentName => {
    const elements = source.findJSXElements(componentName);

    if (elements.length === 0) return;

    elements.forEach(element => {
      addJSXAttributes({
        j,
        element,
        propName: 'usePortal',
        propValue: true,
      });
      consolidateJSXAttributes({
        j,
        element,
        propToRemove: 'usePortal',
        propToUpdate: 'renderMode',
        propMapping: {
          false: 'inline',
          true: 'portal',
        },
        propToRemoveType: 'boolean',
      });
    });
  });

  Object.keys(componentNamesWithPropsToRemoveMap).forEach(componentName => {
    const elements = source.findJSXElements(componentName);

    if (elements.length === 0) return;

    elements.forEach(element => {
      componentNamesWithPropsToRemoveMap[componentName].forEach(propName => {
        removeJSXAttributes({
          j,
          element,
          propName,
        });
      });
    });
  });

  return source.toSource();
}
