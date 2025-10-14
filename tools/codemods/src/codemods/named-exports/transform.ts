import type { API, FileInfo, Options } from 'jscodeshift';

import { MigrateOptions } from '../..';
import { LGPackage } from '../../types';
import { hasNamedImport, mergeImportSpecifiers } from '../../utils/imports';

const lgPackageComponentMap: Partial<Record<LGPackage, string>> = {
  [LGPackage.Badge]: 'Badge',
  [LGPackage.Banner]: 'Banner',
  [LGPackage.Button]: 'Button',
  [LGPackage.Callout]: 'Callout',
  [LGPackage.Card]: 'Card',
  [LGPackage.Checkbox]: 'Checkbox',
  [LGPackage.Code]: 'Code',
  [LGPackage.ConfirmationModal]: 'ConfirmationModal',
  [LGPackage.Copyable]: 'Copyable',
  [LGPackage.ExpandableCard]: 'ExpandableCard',
  [LGPackage.FormFooter]: 'FormFooter',
  [LGPackage.Icon]: 'Icon',
  [LGPackage.IconButton]: 'IconButton',
  [LGPackage.InlineDefinition]: 'InlineDefinition',
  [LGPackage.Logo]: 'Logo',
  [LGPackage.MarketingModal]: 'MarketingModal',
  [LGPackage.Modal]: 'Modal',
  [LGPackage.Pagination]: 'Pagination',
  [LGPackage.Portal]: 'Portal',
  [LGPackage.Popover]: 'Popover',
  [LGPackage.Stepper]: 'Stepper',
  [LGPackage.TextArea]: 'TextArea',
  [LGPackage.TextInput]: 'TextInput',
  [LGPackage.Toggle]: 'Toggle',
  [LGPackage.Tooltip]: 'Tooltip',
};

const defaultPackages: Array<LGPackage> = [
  ...(Object.keys(lgPackageComponentMap) as Array<LGPackage>),
];

/**
 * Transformer function that converts default imports to named imports for LeafyGreen UI components.
 *
 * ### Examples:
 * **Before:**
 * ```tsx
 * import Button, { Size } from '@leafygreen-ui/button';
 * import LGModal from '@leafygreen-ui/modal';
 * import Tooltip from '@leafygreen-ui/tooltip';
 * ```
 *
 * **After:**
 * ```tsx
 * import { Button, Size } from '@leafygreen-ui/button';
 * import { Modal as LGModal } from '@leafygreen-ui/modal';
 * import { Tooltip } from '@leafygreen-ui/tooltip';
 * ```
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
    providedPackages.forEach((packageName: string) => {
      if (!defaultPackages.includes(packageName as LGPackage)) {
        throw new Error(
          `Cannot run named-exports codemod on package: ${packageName}`,
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
   * Process each package to convert default imports to named imports
   */
  packagesToCheck.forEach((packageName: LGPackage) => {
    const componentName = lgPackageComponentMap[packageName];
    if (!componentName) return;

    // Find all import declarations for this package
    const importDeclarations = source
      .find(j.ImportDeclaration)
      .filter((path: any) => path.node.source.value === packageName);

    importDeclarations.forEach(importDeclaration => {
      // Check if named import already exists
      if (hasNamedImport(j, source, packageName, componentName)) {
        return; // Skip if named import already exists
      }

      // Find default import specifier
      const defaultSpecifiers = j(importDeclaration).find(
        j.ImportDefaultSpecifier,
      );

      if (defaultSpecifiers.length === 0) {
        return; // No default import found
      }

      const defaultImport = defaultSpecifiers.at(0).get();
      const alias = defaultImport.node.local?.name;

      // Merge default import with existing named imports
      mergeImportSpecifiers(j, importDeclaration, componentName, alias);
    });
  });

  return source.toSource();
}
