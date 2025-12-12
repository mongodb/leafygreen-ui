import type { API, FileInfo, Options } from 'jscodeshift';

import { MigrateOptions } from '../..';
import { getJSXAttributes } from '../../utils/jsx';
import {
  addJSXAttributes,
  replaceJSXAttributes,
} from '../../utils/transformations';

/**
 * Package names to check for Spinner imports
 */
const spinnerPackages = [
  '@leafygreen-ui/loading-indicator',
  '@leafygreen-ui/loading-indicator/spinner',
];

/**
 * Maps old DisplayOption values to new size values
 */
const displayOptionToSizeMap: Record<string, string> = {
  'default-horizontal': 'default',
  'default-vertical': 'default',
  'large-vertical': 'large',
  'xlarge-vertical': 'large',
};

/**
 * Maps old DisplayOption values to direction values
 */
const displayOptionToDirectionMap: Record<string, string> = {
  'default-horizontal': 'horizontal',
  'default-vertical': 'vertical',
  'large-vertical': 'vertical',
  'xlarge-vertical': 'vertical',
};

/**
 * Transformer function that will transform the Spinner component from v3 to v5
 *
 * This codemod transforms the following packages:
 * - `@leafygreen-ui/loading-indicator`
 * - `@leafygreen-ui/loading-indicator/spinner` (tree-shaken import)
 *
 * It does the following:
 * 1. Converts `displayOption` prop to `size` prop with appropriate value mapping
 * 2. Adds `direction` prop based on displayOption value (only when description is present)
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
): string {
  const source = j(file.source);

  /**
   * Note: The `options.packages` parameter is intentionally unused.
   * This codemod is specifically designed to transform Spinner components
   * from the loading-indicator package. The package filtering is handled
   * by checking import sources against the `spinnerPackages` array below,
   * making the packages option unnecessary.
   */

  /**
   * Step 1: Find all Spinner component names (including aliases) from matching imports.
   * This searches through all import declarations to identify Spinner components
   * imported from the loading-indicator packages, accounting for any aliases used.
   */
  const spinnerComponentNames: Array<string> = [];

  source.find(j.ImportDeclaration).forEach(path => {
    const importSource = path.node.source.value;

    // Check if this import is from one of the spinner packages
    if (
      typeof importSource === 'string' &&
      spinnerPackages.some(pkg => importSource === pkg)
    ) {
      // Extract the local name of the Spinner import (handles aliases)
      path.node.specifiers?.forEach(specifier => {
        if (
          specifier.type === 'ImportSpecifier' &&
          specifier.imported.name === 'Spinner'
        ) {
          spinnerComponentNames.push(specifier.local?.name || 'Spinner');
        }
      });
    }
  });

  /**
   * Step 2: Transform displayOption -> size + direction for each Spinner component.
   * For each Spinner component found, we:
   * 1. Replace the `displayOption` prop with the `size` prop using the mapping
   * 2. If a `description` prop exists, add a `direction` prop based on the original displayOption value
   */
  spinnerComponentNames.forEach(componentName => {
    const elements = source.findJSXElements(componentName);

    if (elements.length === 0) return;

    elements.forEach(element => {
      // Check if this element has a displayOption prop
      const displayOptionAttributes = getJSXAttributes(
        j,
        element,
        'displayOption',
      );

      if (displayOptionAttributes.length > 0) {
        // Extract the displayOption value as a string
        let displayOptionValue = '';
        displayOptionAttributes.forEach(attr => {
          const value = attr.node.value;

          if (value && value.type === 'StringLiteral') {
            displayOptionValue = value.value;
          }
        });

        // Check if the component has a description prop
        // (direction is only needed when description is present)
        const descriptionAttributes = getJSXAttributes(
          j,
          element,
          'description',
        );
        const hasDescription = descriptionAttributes.length > 0;

        // Replace displayOption with size using the value mapping
        replaceJSXAttributes({
          j,
          element,
          propName: 'displayOption',
          newPropName: 'size',
          newPropValue: displayOptionToSizeMap,
        });

        // If description exists, add direction prop based on the original displayOption
        if (hasDescription && displayOptionValue) {
          const directionValue =
            displayOptionToDirectionMap[displayOptionValue];

          if (directionValue) {
            addJSXAttributes({
              j,
              element,
              propName: 'direction',
              propValue: directionValue,
            });
          }
        }
      }
    });
  });

  return source.toSource();
}
