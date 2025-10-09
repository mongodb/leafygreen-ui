import {
  Children,
  ComponentType,
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

  // child must be a single node
  if (Children.count(child) !== 1) return false;

  return hasStaticProperty(child.type, staticProperty);
};
