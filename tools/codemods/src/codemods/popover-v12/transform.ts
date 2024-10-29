import type { API, FileInfo, Options } from 'jscodeshift';
import kebabCase from 'lodash.kebabcase';

import { MigrateOptions } from '../..';
import { MIGRATOR_ERROR } from '../../constants';
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
 * - `InfoSprinkle`
 * - `InlineDefinition`
 * - `NumberInput`
 * 3. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, and `scrollContainer` props from the following components:
 * - `DatePicker`
 * - `GuideCue`
 * 4. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `scrollContainer`, and `usePortal` props from `Code` component
 * 5. Removes `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and `usePortal` props from `SearchInput` component
 * 6. Removes `shouldTooltipUsePortal` prop from `Copyable` component
 *
 * @param file the file to transform
 * @param jscodeshiftOptions an object containing at least a reference to the jscodeshift library
 * @param options an object containing options to pass to the transform function
 * @returns Either the modified file or the original file
 */
export default function transformer(
  file: FileInfo,
  { jscodeshift: j }: API,
  options: MigrateOptions & Options,
) {
  const source = j(file.source);

  componentNamesForConsolidation.forEach(componentName => {
    if (
      options.components &&
      !options.components.includes(kebabCase(componentName))
    ) {
      return;
    }

    const elements = source.findJSXElements(componentName);

    if (elements.length === 0) return;

    elements.forEach(element => {
      addJSXAttributes({
        j,
        element,
        propName: 'usePortal',
        propValue: true,
        commentOverride: `${MIGRATOR_ERROR.manualAdd} prop: renderMode`,
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
    if (
      options.components &&
      !options.components.includes(kebabCase(componentName))
    ) {
      return;
    }

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
