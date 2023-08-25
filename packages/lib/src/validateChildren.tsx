import isObject from 'lodash/isObject';
import isUndefined from 'lodash/isUndefined';
import React, { ReactElement } from 'react';
import { consoleOnce } from '.';

/** Helper type to check if element is a specific React Component  */
export function isComponentType<
  T extends React.ReactElement = React.ReactElement,
>(element: React.ReactNode, displayName: string): element is T {
  return (
    element != null &&
    typeof element === 'object' &&
    'type' in element &&
    ((element.type as any).displayName === displayName ||
      // TODO: temp solution; Components using InferredPolymorphic have a displayName inside render.
      // https://jira.mongodb.org/browse/LG-3232
      (isObject(element.type as any) &&
        'render' in (element.type as any) &&
        (element.type as any).render?.displayName === displayName))
  );
}

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
