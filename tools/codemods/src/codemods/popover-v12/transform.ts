import type { API, FileInfo, Options } from 'jscodeshift';

import { MigrateOptions } from '../..';
import { MIGRATOR_ERROR } from '../../constants';
import { LGPackage } from '../../types';
import { getJSXAttributes } from '../../utils/jsx';
import {
  addJSXAttributes,
  consolidateJSXAttributes,
  removeJSXAttributes,
  replaceJSXAttributes,
} from '../../utils/transformations';

const lgPackageComponentForPropConsolidationMap: Partial<
  Record<LGPackage, string>
> = {
  [LGPackage.Combobox]: 'Combobox',
  [LGPackage.Menu]: 'Menu',
  [LGPackage.Popover]: 'Popover',
  [LGPackage.Select]: 'Select',
  [LGPackage.SplitButton]: 'SplitButton',
  [LGPackage.Tooltip]: 'Tooltip',
};

const lgPackageComponentForPropRemovalMap: Partial<Record<LGPackage, string>> =
  {
    [LGPackage.Code]: 'Code',
    [LGPackage.Copyable]: 'Copyable',
    [LGPackage.DatePicker]: 'DatePicker',
    [LGPackage.GuideCue]: 'GuideCue',
    [LGPackage.InfoSprinkle]: 'InfoSprinkle',
    [LGPackage.InlineDefinition]: 'InlineDefinition',
    [LGPackage.NumberInput]: 'NumberInput',
    [LGPackage.SearchInput]: 'SearchInput',
  };

const lgPackageComponentForPropReplacementMap: Partial<
  Record<LGPackage, string>
> = {
  [LGPackage.DatePicker]: 'DatePicker',
  [LGPackage.InfoSprinkle]: 'InfoSprinkle',
  [LGPackage.InlineDefinition]: 'InlineDefinition',
  [LGPackage.Menu]: 'Menu',
  [LGPackage.Popover]: 'Popover',
  [LGPackage.Tooltip]: 'Tooltip',
};

const defaultPackages: Array<LGPackage> = [
  ...(Object.keys({
    ...lgPackageComponentForPropConsolidationMap,
    ...lgPackageComponentForPropRemovalMap,
    ...lgPackageComponentForPropReplacementMap,
  }) as Array<LGPackage>),
];

const propNamesToRemove = [
  'popoverZIndex',
  'portalClassName',
  'portalContainer',
  'portalRef',
  'scrollContainer',
  'usePortal',
];

const componentPropsToRemoveMap: Record<string, Array<string>> = {
  [LGPackage.Code]: propNamesToRemove.filter(
    propName => propName !== 'portalRef',
  ),
  [LGPackage.Copyable]: ['shouldTooltipUsePortal'],
  [LGPackage.DatePicker]: propNamesToRemove.filter(
    propName => propName !== 'usePortal',
  ),
  [LGPackage.GuideCue]: propNamesToRemove.filter(
    propName => propName !== 'usePortal',
  ),
  [LGPackage.InfoSprinkle]: propNamesToRemove,
  [LGPackage.InlineDefinition]: propNamesToRemove,
  [LGPackage.NumberInput]: propNamesToRemove,
  [LGPackage.SearchInput]: propNamesToRemove.filter(
    propName => propName !== 'popoverZIndex',
  ),
};

/**
 * Transformer function that will transform the below packages by default. Consumers can
 * use the `--packages` flag to apply the codemod to a subset of these packages.
 *
 * It does the following:
 * 1. Adds an explicit `usePortal={true}` declaration if left undefined and consolidates
 *    the `usePortal` and `renderMode` props into a single `renderMode` prop for components
 *    in the following packages:
 * - `@leafygreen-ui/combobox`
 * - `@leafygreen-ui/menu`
 * - `@leafygreen-ui/popover`
 * - `@leafygreen-ui/select`
 * - `@leafygreen-ui/split-button`
 * - `@leafygreen-ui/tooltip`
 *
 * 2. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`,
 *    `scrollContainer`, and `usePortal` props from the components in the following packages:
 * - `@leafygreen-ui/info-sprinkle`
 * - `@leafygreen-ui/inline-definition`
 * - `@leafygreen-ui/number-input`
 *
 * 3. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `portalRef`, and
 *    `scrollContainer` props from components in the following packages:
 * - `@leafygreen-ui/date-picker`
 * - `@leafygreen-ui/guide-cue`
 *
 * 4. Removes `popoverZIndex`, `portalClassName`, `portalContainer`, `scrollContainer`,
 *    and `usePortal` props from `Code` component in the `@leafygreen-ui/code` package
 *
 * 5. Removes `portalClassName`, `portalContainer`, `portalRef`, `scrollContainer`, and
 *    `usePortal` props from `SearchInput` component in the `@leafygreen-ui/search-input` package
 *
 * 6. Removes `shouldTooltipUsePortal` prop from the `Copyable` component in the `@leafygreen-ui/copyable` package
 *
 * 7. Replaces `justify="fit"` prop value with `justify="middle"` for components in the following packages:
 * - `@leafygreen-ui/date-picker`
 * - `@leafygreen-ui/info-sprinkle`
 * - `@leafygreen-ui/inline-definition`
 * - `@leafygreen-ui/menu`
 * - `@leafygreen-ui/popover`
 * - `@leafygreen-ui/tooltip`
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
          `Cannot run popover-v12 codemod on package: ${packageName}`,
        );
      }
    });
  }

  /**
   * Gets all components to transform for a given package name, including if aliased.
   * @param packageName - The package name to check for components to transform
   * @param lgPackageComponentsMap - The map of LGPackage to component names to look for
   * @returns all component names to transform for the given package name
   */
  const getAllComponentsToTransform = ({
    packageName,
    lgPackageComponentsMap,
  }: {
    packageName: LGPackage;
    lgPackageComponentsMap: Partial<Record<LGPackage, string>>;
  }) => {
    const componentsToTransform: Array<string> = [];

    /**
     * Look for the import declaration for the given package name.
     */
    const matchingImportDeclaration = source
      .find(j.ImportDeclaration)
      .filter(path => path.node.source.value === packageName);

    /**
     * If no matching import declaration is found, return empty array.
     */
    if (matchingImportDeclaration.length === 0) {
      return componentsToTransform;
    }

    /**
     * Look for default import declarations for the given package name.
     * This will also apply if the default import is aliased.
     */
    matchingImportDeclaration.find(j.ImportDefaultSpecifier).forEach(path => {
      if (!path.node.local) {
        return;
      }

      componentsToTransform.push(path.node.local.name);
    });

    /**
     * Look for named import declarations for the given package name.
     */
    const namedExportToLookFor = lgPackageComponentsMap[packageName];
    matchingImportDeclaration.find(j.ImportSpecifier).forEach(path => {
      /**
       * If the named import does not match the component to look for, keep checking the next import.
       */
      const matchesComponentImport =
        path.node.imported.name === namedExportToLookFor;

      if (!matchesComponentImport) {
        return;
      }

      /**
       * If the named import is aliased, use the alias name.
       */
      componentsToTransform.push(
        path.node.local ? path.node.local.name : namedExportToLookFor,
      );
    });

    return componentsToTransform;
  };

  /**
   * By default, transform all components in the default packages. If the `packages` option is provided,
   * only transform the provided packages.
   */
  const packagesToCheck = providedPackages || defaultPackages;
  const packagesForPropConsolidation = packagesToCheck.filter(
    packageName => lgPackageComponentForPropConsolidationMap[packageName],
  );
  const packagesForPropRemoval = packagesToCheck.filter(
    packageName => lgPackageComponentForPropRemovalMap[packageName],
  );
  const packagesForPropReplacement = packagesToCheck.filter(
    packageName => lgPackageComponentForPropReplacementMap[packageName],
  );

  /**
   * This block handles transforming components that require prop consolidation.
   */
  packagesForPropConsolidation.forEach(packageName => {
    const componentsForPropConsolidation = getAllComponentsToTransform({
      packageName,
      lgPackageComponentsMap: lgPackageComponentForPropConsolidationMap,
    });

    componentsForPropConsolidation.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        const attributes = getJSXAttributes(j, element, 'renderMode');

        if (attributes.length === 0) {
          addJSXAttributes({
            j,
            element,
            propName: 'usePortal',
            propValue: true,
            commentOverride: `${MIGRATOR_ERROR.manualAdd} prop: renderMode`,
          });
        }

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
  });

  /**
   * This block handles transforming components that require prop removal.
   */
  packagesForPropRemoval.forEach(packageName => {
    const componentsForPropRemoval = getAllComponentsToTransform({
      packageName,
      lgPackageComponentsMap: lgPackageComponentForPropRemovalMap,
    });

    componentsForPropRemoval.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        componentPropsToRemoveMap[packageName].forEach(propName => {
          removeJSXAttributes({
            j,
            element,
            propName,
          });
        });
      });
    });
  });

  /**
   * This block handles transforming components that require prop replacement.
   */
  packagesForPropReplacement.forEach(packageName => {
    const componentsForPropReplacement = getAllComponentsToTransform({
      packageName,
      lgPackageComponentsMap: lgPackageComponentForPropReplacementMap,
    });

    componentsForPropReplacement.forEach(componentName => {
      const elements = source.findJSXElements(componentName);

      if (elements.length === 0) return;

      elements.forEach(element => {
        replaceJSXAttributes({
          j,
          element,
          propName: 'justify',
          newPropName: 'justify',
          newPropValue: {
            fit: 'middle',
          },
        });
      });
    });
  });

  return source.toSource();
}
