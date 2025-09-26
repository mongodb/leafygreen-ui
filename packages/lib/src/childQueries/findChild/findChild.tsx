import { Children, ReactElement, ReactNode } from 'react';

import { isChildWithProperty } from '../isChildWithProperty';
import { unwrapRootFragment } from '../unwrapRootFragment';

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
 * findChild(<Foo />, 'isFoo') // <Foo />
 *
 * // ✅ Will find: Child inside a single fragment
 * findChild(<><Foo /></>, 'isFoo') // <Foo />
 *
 * // ❌ Will NOT find: Deeply nested fragments
 * findChild(<><><Foo /></></>, 'isFoo') // undefined
 *
 * // ❌ Will NOT find: Nested in other elements
 * findChild(<div><Foo /></div>, 'isFoo') // undefined
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

  const allChildren = unwrapRootFragment(children);

  return allChildren?.find(child =>
    isChildWithProperty(child, staticProperty),
  ) as ReactElement | undefined;
};
