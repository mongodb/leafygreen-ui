import {
  Children,
  ComponentType,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { hasAnyStaticProperty, hasStaticProperty } from '../hasStaticProperty';

/**
 * Type guard to check if a child is a valid ReactElement with a matching static property.
 * Supports checking for a single property or any property from an array of property names.
 *
 * @param child - The React node to check
 * @param staticProperty - A single property name or array of property names to check for
 * @returns True if the child has any of the specified static properties
 */
export const isChildWithProperty = <S extends string>(
  child: ReactNode,
  staticProperty: S | Array<S>,
): child is ReactElement<any, ComponentType & { [K in S]: any }> => {
  if (!isValidElement(child)) return false;

  // child must be a single node
  if (Children.count(child) !== 1) return false;

  if (Array.isArray(staticProperty)) {
    return hasAnyStaticProperty(child.type, staticProperty);
  }

  return hasStaticProperty(child.type, staticProperty);
};
