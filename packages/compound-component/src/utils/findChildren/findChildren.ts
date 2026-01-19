import { Children, isValidElement, ReactElement, ReactNode } from 'react';

import {
  hasAnyStaticProperty,
  hasStaticProperty,
} from '../hasStaticProperty';
import { unwrapRootFragment } from '../unwrapRootFragment';

/**
 * Type guard to check if a child is a valid ReactElement with a matching static property
 */
const isChildWithMatchingProperty = (
  child: ReactNode,
  staticProperty: string | Array<string>,
): child is ReactElement => {
  if (!isValidElement(child)) return false;
  if (Children.count(child) !== 1) return false;

  if (Array.isArray(staticProperty)) {
    return hasAnyStaticProperty(child.type, staticProperty);
  }

  return hasStaticProperty(child.type, staticProperty);
};

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
 * @example
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
 * // ✅ Will find: Multiple static properties (array)
 * findChildren([
 *   <Foo />,
 *   <Bar />
 * ], ['isFoo', 'isBar']) // [<Foo />, <Bar />]
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
 * @param staticProperty The static property name (or array of names) to check for
 * @returns All matching ReactElements (or empty array if not found)
 */
export const findChildren = (
  children: ReactNode,
  staticProperty: string | Array<string>,
): Array<ReactElement> => {
  const allChildren = unwrapRootFragment(children);

  if (!allChildren) return [];

  return allChildren
    .flat()
    .filter((child): child is ReactElement =>
      isChildWithMatchingProperty(child, staticProperty),
    );
};
