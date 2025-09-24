import {
  Children,
  Fragment,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';

import { hasStaticProperty } from '../hasStaticProperty';

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
  const allChildren = Children.toArray(children);

  for (const child of allChildren) {
    if (!isValidElement(child)) continue;

    // Handle fragments by checking their children first
    if (child.type === Fragment) {
      const fragmentChildren = Children.toArray(child.props.children);

      for (const fragmentChild of fragmentChildren) {
        if (!isValidElement(fragmentChild)) continue;

        if (hasStaticProperty(fragmentChild.type, staticProperty)) {
          return fragmentChild as ReactElement;
        }
      }
      continue;
    }

    // Check direct children
    if (hasStaticProperty(child.type, staticProperty)) {
      return child as ReactElement;
    }
  }

  return undefined;
};
