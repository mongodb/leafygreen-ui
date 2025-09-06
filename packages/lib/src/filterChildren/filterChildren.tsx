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
 * ```ts
 * // ✅ Will filter out: Direct children with matching properties
 * <Foo isFoo={true} />
 *
 * // ✅ Will filter out: Children inside fragments with matching properties
 * <><Bar isBar={true} /></>
 *
 * // ❌ Will NOT filter: Nested fragments
 * <><><Baz isBaz={true} /></></>
 *
 * // ❌ Will NOT filter: Deeply nested
 * <div><Foo isFoo={true} /></div>
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
