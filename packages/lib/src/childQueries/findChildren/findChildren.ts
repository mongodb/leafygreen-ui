import { ReactElement, ReactNode } from 'react';

import { isChildWithProperty } from '../isChildWithProperty';
import { unwrapRootFragment } from '../unwrapRootFragment';

/**
 *
 * Finds all children with a matching static property
 *
 * * **Search Depth:** This function only searches 1 level deep:
 * - Direct children of the provided children
 * - Direct children inside React.Fragment components (1 level of fragment nesting)
 * - Does NOT recursively search nested fragments or deeply nested components
 *
 * **Styled Component Support:** Checks component.target and component.__emotion_base
 * for styled() wrapped components.
 *
 *  * @example
 * ```ts
 * // ✅ Will find: Direct children
 * findChildren([
 *   <Foo />,
 *   <Foo />
 * ], 'isFoo') // [<Foo />, <Foo />]
 *
 * // ✅ Will find: Children inside a single fragment
 * findChildren((
 *   <>
 *     <Foo />
 *     <Foo />
 *   </>
 * ), 'isFoo') // [<Foo />, <Foo />]
 *
 * // ❌ Will NOT find: Deeply nested fragments
 * findChildren((
 *   <>
 *     <>
 *       <Foo />
 *     </>
 *   </>
 * ), 'isFoo') // []
 *
 * // ❌ Will NOT find: Nested in other elements
 * findChildren(<div><Foo /></div>, 'isFoo') // []
 * ```
 *
 * @param children Any React children
 * @param staticProperty The static property name to check for
 * @returns All matching ReactElements (or empty array if not found)
 */
export const findChildren = (
  children: ReactNode,
  staticProperty: string,
): Array<ReactElement> => {
  const allChildren = unwrapRootFragment(children);

  if (!allChildren) return [];

  return allChildren.filter(child =>
    isChildWithProperty(child, staticProperty),
  ) as Array<ReactElement>;
};
