import type { API, FileInfo, Options } from 'jscodeshift';

import { MigrateOptions } from '../..';
import { LGPackage } from '../../types';
import { hasNamedImport, mergeImportSpecifiers } from '../../utils/imports';

const lgPackageComponentMap: Partial<Record<LGPackage, string>> = {
  [LGPackage.Badge]: 'Badge',
  [LGPackage.Button]: 'Button',
  [LGPackage.Callout]: 'Callout',
  [LGPackage.Card]: 'Card',
  [LGPackage.Checkbox]: 'Checkbox',
  [LGPackage.ConfirmationModal]: 'ConfirmationModal',
  [LGPackage.Copyable]: 'Copyable',
  [LGPackage.ExpandableCard]: 'ExpandableCard',
  [LGPackage.FormFooter]: 'FormFooter',
  [LGPackage.GuideCue]: 'GuideCue',
  [LGPackage.Icon]: 'Icon',
  [LGPackage.IconButton]: 'IconButton',
  [LGPackage.InlineDefinition]: 'InlineDefinition',
  [LGPackage.MarketingModal]: 'MarketingModal',
  [LGPackage.Modal]: 'Modal',
  [LGPackage.Pagination]: 'Pagination',
  [LGPackage.Popover]: 'Popover',
  [LGPackage.Stepper]: 'Stepper',
  [LGPackage.TextArea]: 'TextArea',
  [LGPackage.TextInput]: 'TextInput',
  [LGPackage.Toggle]: 'Toggle',
  [LGPackage.Tooltip]: 'Tooltip',
  [LGPackage.Box]: 'Box',
  [LGPackage.Code]: 'Code',
  [LGPackage.Logo]: 'Logo',
  [LGPackage.Portal]: 'Portal',
};

const defaultPackages: Array<LGPackage> = [
  ...(Object.keys(lgPackageComponentMap) as Array<LGPackage>),
];

/**
 * Transformer function that converts default imports to named imports for LeafyGreen UI components.
 * 
 * It does the following:
 * 1. Converts `import Button from '@leafygreen-ui/button'` to `import { Button } from '@leafygreen-ui/button'`
 * 2. Converts `import LGButton from '@leafygreen-ui/button'` to `import { Button as LGButton } from '@leafygreen-ui/button'`
 * 3. Merges default and named imports: `import Button, { Size } from '@leafygreen-ui/button'` to `import { Button, Size } from '@leafygreen-ui/button'`
 * 4. Skips files that already have the correct named import
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
      const defaultSpecifiers = j(importDeclaration)
        .find(j.ImportDefaultSpecifier);

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
