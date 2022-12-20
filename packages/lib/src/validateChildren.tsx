import isUndefined from 'lodash/isUndefined';
import React, { ReactElement } from 'react';
import { consoleOnce, isComponentType } from '.';

/**
 * Filters children down to a restricted set of component types.
 *
 * Example:
 * ```ts
 * // `options` will only include `ComboboxOption` components,
 * // and log an error to the console for any invalid children
 * const options = validateChildren(children, ['ComboboxOption'])
 * ```
 *
 * @returns Array<ReactElement>
 */
export const validateChildren = (
  /** Any React children */
  children: React.ReactNode,
  /** Array of `displayNames` for valid components */
  validTypes: Array<string>,
): Array<ReactElement> | undefined => {
  const validChildren = React.Children.map(children, child => {
    if (validTypes.some(type => isComponentType(child, type))) {
      return child as React.ReactElement;
    }
  })?.filter(child => !isUndefined(child));

  if (
    !isUndefined(children) &&
    validChildren?.length !== React.Children.count(children)
  ) {
    consoleOnce.error(
      `Children must be one of: ${validTypes.join(', ')}`,
      `Received children: `,
      children,
    );
  }

  return validChildren;
};
