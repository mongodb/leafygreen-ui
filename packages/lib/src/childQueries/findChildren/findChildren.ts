import {
  Children,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { isChildWithProperty } from '../isChildWithProperty/isChildWithProperty';

export const findChildren = (
  children: ReactNode,
  staticProperty: string,
): Array<ReactElement> => {
  if (!children || Children.count(children) === 0) {
    return [];
  }

  let allChildren = Children.toArray(children);

  // Since we don't recurse into nested fragments,
  // we can unwrap the top-level fragment if it's the only child
  // and search its children directly
  if (allChildren.length === 1) {
    const child = allChildren[0];

    if (isValidElement(child) && child.type === Fragment) {
      allChildren = Children.toArray(child.props.children);
    }
  }

  return allChildren.filter(child =>
    isChildWithProperty(child, staticProperty),
  );
};
