import {
  Children,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { isChildWithProperty } from '../isChildWithProperty/isChildWithProperty';

/**
 * Find the first child component with a matching static property
 *
 * **Search Depth:** This function only searches 1 level deep:
 * - Direct children of the provided children
 * - Direct children inside React.Fragment components (1 level of fragment nesting)
 * - Does NOT recursively search nested fragments or deeply nested components
 *
 * **Styled Component Support:** Checks component.target and component.__emotion_base
 * for styled() wrapped components.
 *
 * @example
 * ```ts
 * // ✅ Will find: Direct child
 * <Foo />
 *
 * // ✅ Will find: Child inside fragment
 * <><Foo /></>
 *
 * // ❌ Will NOT find: Nested fragments
 * <><><Foo /></></>
 *
 * // ❌ Will NOT find: Deeply nested
 * <div><Foo /></div>
 * ```
 *
 * @param children Any React children
 * @param staticProperty The static property name to check for
 * @returns The first matching ReactElement or undefined if not found
 */
export const findChild = (
  children: ReactNode,
  staticProperty: string,
): ReactElement | undefined => {
  if (!children || Children.count(children) === 0) {
    return undefined;
  }

  let allChildren = Children.toArray(children);

  // Since we don't recurse into nested fragments,
  // we can unwrap the top-level fragment if it's the only child
  if (Children.count(allChildren) === 1) {
    const child = allChildren[0];

    if (isValidElement(child) && child.type === Fragment) {
      allChildren = Children.toArray(child.props.children);
    }
  }

  return allChildren.find(child => isChildWithProperty(child, staticProperty));
};
