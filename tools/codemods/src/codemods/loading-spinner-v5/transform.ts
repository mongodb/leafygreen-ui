import type { API, FileInfo, Options } from 'jscodeshift';

import { MigrateOptions } from '../..';
import { LGPackage } from '../../types';
import { getImportSpecifiersForDeclaration } from '../../utils/imports';
import { getJSXAttributes } from '../../utils/jsx';
import { insertJSXComment } from '../../utils/jsx';
import {
  removeJSXAttributes,
  replaceJSXAttributes,
} from '../../utils/transformations';

const lgPackageComponentMap: Partial<Record<LGPackage, string>> = {
  [LGPackage.LoadingIndicator]: 'Spinner',
};

const defaultPackages: Array<LGPackage> = [
  ...(Object.keys(lgPackageComponentMap) as Array<LGPackage>),
];

/**
 * Maps old DisplayOption values to new SpinnerSize values
 */
const displayOptionToSizeMap: Record<string, string> = {
  'default-horizontal': 'default',
  'default-vertical': 'default',
  'large-vertical': 'large',
  'xlarge-vertical': 'large', // xlarge has been deprecated (but new `large` is the same size)
};

/**
 * Transformer function that will transform the Spinner component from v3 to v5
 *
 * This codemod transforms the following packages:
 * - `@leafygreen-ui/loading-indicator`
 *
 * It does the following:
 * 1. Converts `displayOption` prop to `size` prop with appropriate value mapping
 * 2. Removes `description` prop and adds guidance comment
 * 3. Removes `baseFontSize` prop if present
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
): string {
  const source = j(file.source);
  const providedPackages = options.packages;

  /**
   * If the `packages` option is provided, ensure that the provided packages are all valid.
   */
  if (providedPackages) {
    providedPackages.forEach(packageName => {
      if (!defaultPackages.includes(packageName)) {
        throw new Error(
          `Cannot run loading-spinner-v5 codemod on package: ${packageName}`,
        );
      }
    });
  }

  /**
   * By default, transform all components in the default packages. If the `packages` option is provided,
   * only transform the provided packages.
   */
  const packagesToCheck = providedPackages || defaultPackages;

  /**
   * Get all components to transform for each package upfront to avoid repetition
   */
  const packageComponentsMap = new Map<LGPackage, Array<string>>();

  packagesToCheck.forEach(packageName => {
    const componentsToTransform = getImportSpecifiersForDeclaration({
      j,
      source,
      packageName,
      packageSpecifiersMap: lgPackageComponentMap,
    });
    packageComponentsMap.set(packageName, componentsToTransform);
  });

  /**
   * Step 1: Replace displayOption -> size with value mapping
   */
  packagesToCheck.forEach(packageName => {
    const componentsToTransform = packageComponentsMap.get(packageName)!;

    componentsToTransform.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        // Check if displayOption prop exists
        const displayOptionAttributes = getJSXAttributes(
          j,
          element,
          'displayOption',
        );

        if (displayOptionAttributes.length > 0) {
          replaceJSXAttributes({
            j,
            element,
            propName: 'displayOption',
            newPropName: 'size',
            newPropValue: displayOptionToSizeMap,
          });
        }
      });
    });
  });

  /**
   * Step 2: Remove description prop and add guidance comment
   */
  packagesToCheck.forEach(packageName => {
    const componentsToTransform = packageComponentsMap.get(packageName)!;

    componentsToTransform.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        // Check if description prop exists
        const descriptionAttributes = getJSXAttributes(
          j,
          element,
          'description',
        );

        if (descriptionAttributes.length > 0) {
          // Extract the description value
          let descriptionValue = '';
          descriptionAttributes.forEach(attr => {
            const value = attr.node.value;

            if (value) {
              if (value.type === 'StringLiteral') {
                descriptionValue = value.value;
              } else if (value.type === 'JSXExpressionContainer') {
                // For expression containers, convert to source code
                descriptionValue = j(value.expression).toSource();
              }
            }
          });

          // Add previous description comment first (if there was a description value)
          // Then add the TODO comment (which will appear above the previous description comment)
          if (descriptionValue) {
            insertJSXComment(
              j,
              element,
              `Previous description: "${descriptionValue}"`,
              'before',
            );
          }

          // Add guidance comment before removing the prop
          insertJSXComment(
            j,
            element,
            'TODO: The Spinner component no longer supports the `description` prop. Please render description text separately using the Typography component.',
            'before',
          );

          removeJSXAttributes({
            j,
            element,
            propName: 'description',
          });
        }
      });
    });
  });

  /**
   * Step 3: Remove baseFontSize prop if present
   */
  packagesToCheck.forEach(packageName => {
    const componentsToTransform = packageComponentsMap.get(packageName)!;

    componentsToTransform.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        // Check if baseFontSize prop exists
        const baseFontSizeAttributes = getJSXAttributes(
          j,
          element,
          'baseFontSize',
        );

        if (baseFontSizeAttributes.length > 0) {
          removeJSXAttributes({
            j,
            element,
            propName: 'baseFontSize',
          });
        }
      });
    });
  });

  return source.toSource();
}
