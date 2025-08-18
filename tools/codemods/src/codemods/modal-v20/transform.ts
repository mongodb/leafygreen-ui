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
  [LGPackage.Modal]: 'Modal',
  [LGPackage.ConfirmationModal]: 'ConfirmationModal',
  [LGPackage.MarketingModal]: 'MarketingModal',
};

const defaultPackages: Array<LGPackage> = [
  ...(Object.keys(lgPackageComponentMap) as Array<LGPackage>),
];

/**
 * Transformer function that will transform the below packages by default. Consumers can
 * use the `--packages` flag to apply the codemod to a subset of these packages.
 *
 * It does the following:
 * 1. Renames `className` prop to `backdropClassName` for Modal components in the following packages:
 * - `@leafygreen-ui/modal`
 * - `@leafygreen-ui/confirmation-modal`
 * - `@leafygreen-ui/marketing-modal`
 *
 * 2. Renames `contentClassName` prop to `className` for Modal components in the following packages:
 * - `@leafygreen-ui/modal`
 * - `@leafygreen-ui/confirmation-modal`
 * - `@leafygreen-ui/marketing-modal`
 *
 * 3. Removes `initialFocus` prop and adds guidance comment for Modal components in the following packages:
 * - `@leafygreen-ui/modal`
 * - `@leafygreen-ui/confirmation-modal`
 * - `@leafygreen-ui/marketing-modal`
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
          `Cannot run modal-v20 codemod on package: ${packageName}`,
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
   * Step 1: Replace className → backdropClassName
   * This must happen first to avoid conflicts with step 2
   */
  packagesToCheck.forEach(packageName => {
    const componentsToTransform = packageComponentsMap.get(packageName)!;

    componentsToTransform.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        // Check if className prop exists before trying to rename it
        const classNameAttributes = getJSXAttributes(j, element, 'className');

        if (classNameAttributes.length > 0) {
          replaceJSXAttributes({
            j,
            element,
            propName: 'className',
            newPropName: 'backdropClassName',
          });
        }
      });
    });
  });

  /**
   * Step 2: Replace contentClassName → className
   * This must happen after step 1 to avoid className being renamed to backdropClassName
   */
  packagesToCheck.forEach(packageName => {
    const componentsToTransform = packageComponentsMap.get(packageName)!;

    componentsToTransform.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        // Check if contentClassName prop exists before trying to rename it
        const contentClassNameAttributes = getJSXAttributes(
          j,
          element,
          'contentClassName',
        );

        if (contentClassNameAttributes.length > 0) {
          replaceJSXAttributes({
            j,
            element,
            propName: 'contentClassName',
            newPropName: 'className',
          });
        }
      });
    });
  });

  /**
   * Step 3: Remove initialFocus prop and add guidance comment
   */
  packagesToCheck.forEach(packageName => {
    const componentsToTransform = packageComponentsMap.get(packageName)!;

    componentsToTransform.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        // Check if initialFocus prop exists before trying to remove it
        const initialFocusAttributes = getJSXAttributes(
          j,
          element,
          'initialFocus',
        );

        if (initialFocusAttributes.length > 0) {
          // Add guidance comment before removing the prop
          insertJSXComment(
            j,
            element,
            'TODO: Please specify autoFocus prop on the element that should receive initial focus. Alternatively, you may rely on the default focus behavior which will focus the first focusable element in the children.',
            'before',
          );

          removeJSXAttributes({
            j,
            element,
            propName: 'initialFocus',
          });
        }
      });
    });
  });

  return source.toSource();
}
