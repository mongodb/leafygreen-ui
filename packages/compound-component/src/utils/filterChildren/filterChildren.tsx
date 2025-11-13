import { Children, Fragment, isValidElement, ReactNode } from 'react';

import { hasAnyStaticProperty } from '../hasStaticProperty';

/**
 * Filter out child components that have any of the specified static properties
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
 * ```tsx
 * // Mark components with static properties
 * Foo.isFoo = true;
 * Bar.isBar = true;
 * Baz.isBaz = true;
 *
 * // ✅ Will filter out: Direct children with matching static properties
 * const children = (
 *   <>
 *     <Foo />
 *     <Bar />
 *     <div><Foo /></div>
 *     <>
 *       <Baz />
 *     </>
 *   </>
 * );
 *
 * // Filter out all children whose type has the static property "isFoo" or "isBar"
 * const result = filterChildren(children, ["isFoo", "isBar"]);
 *
 * // result will NOT include <Foo /> or <Bar />, but will include:
 * // - <div><Foo /></div> (deeply nested, not filtered)
 * // - <><Baz /></> (nested fragment, not filtered)
 * ```
 *
 * @param children Any React children
 * @param staticPropertiesToExclude Array of static property names to filter out
 * @returns ReactNode with matching components filtered out
 */
export const filterChildren = (
  children: ReactNode,
  staticPropertiesToExclude: Array<string>,
): ReactNode => {
  // Handle empty/null children - Children.map returns null for these cases
  if (!children) return [];

  return Children.map(children, child => {
    if (!isValidElement(child)) return child;

    // Handle fragments by filtering their children
    if (child.type === Fragment) {
      // Children.map automatically flattens the returned array,
      // maintaining the fragment flattening behavior
      return Children.map(child.props.children, fragmentChild => {
        if (!isValidElement(fragmentChild)) return fragmentChild;

        if (
          hasAnyStaticProperty(fragmentChild.type, staticPropertiesToExclude)
        ) {
          return null; // Filter out - React ignores null returns
        }

        return fragmentChild;
      });
    }

    // Filter direct children
    if (hasAnyStaticProperty(child.type, staticPropertiesToExclude)) {
      return null; // Filter out - React ignores null returns
    }

    return child;
  });
};
