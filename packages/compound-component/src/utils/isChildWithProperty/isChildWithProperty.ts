import {
  Children,
  ComponentType,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { hasStaticProperty } from '../hasStaticProperty';

/**
 * Type guard to check if a child is a valid ReactElement with a matching static property.
 *
 * @deprecated Use `isChildWithSomeProperty` instead, which supports both single string
 * and array of property names.
 *
 * @param child - The React node to check
 * @param staticProperty - The static property name to check for
 * @returns True if the child has the specified static property
 */
export const isChildWithProperty = <S extends string>(
  child: ReactNode,
  staticProperty: S,
): child is ReactElement<any, ComponentType & { [K in S]: any }> => {
  if (!isValidElement(child)) return false;

  // child must be a single node
  if (Children.count(child) !== 1) return false;

  return hasStaticProperty(child.type, staticProperty);
};
