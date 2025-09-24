import {
  Children,
  ComponentType,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { hasStaticProperty } from '../hasStaticProperty';

export const isChildWithProperty = <S extends string>(
  child: ReactNode,
  staticProperty: S,
): child is ReactElement<any, ComponentType & { [K in S]: any }> => {
  if (!isValidElement(child)) return false;

  if (hasStaticProperty(child.type, staticProperty)) {
    return true;
  }

  // If the child is a Fragment, check if it has exactly one child
  // and if that child has the desired static property
  if (child.type === Fragment) {
    try {
      if (Children.count(child.props.children) === 1) {
        const fragmentChild = Children.only(child.props.children);
        // Could recurse here if we wanted to support deeper fragment nesting
        return hasStaticProperty(fragmentChild.type, staticProperty);
      }
    } catch {
      // If Children.only throws, it means there are multiple children or no children
      return false;
    }
  }

  return false;
};
