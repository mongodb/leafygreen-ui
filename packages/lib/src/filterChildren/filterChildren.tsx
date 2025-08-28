import { Children, Fragment, isValidElement, ReactNode } from 'react';

/**
 * Check if a component has any of the specified static properties.
 * Handles regular components, standard styled() components, and exotic forward ref styled components.
 */
function hasAnyStaticProperty(
  component: any,
  staticProperties: Array<string>,
): boolean {
  return staticProperties.some(
    property =>
      component[property] || // Direct property on component
      component.target?.[property] || // Standard styled() components store original in target
      component.__emotion_base?.[property], // Exotic forward ref styled components store original in __emotion_base
  );
}

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
  const allChildren = Children.toArray(children);
  const filteredChildren: Array<ReactNode> = [];

  for (const child of allChildren) {
    if (!isValidElement(child)) {
      filteredChildren.push(child);
      continue;
    }

    // Handle fragments by filtering their children
    if (child.type === Fragment) {
      const fragmentChildren = Children.toArray(child.props.children);
      const filteredFragmentChildren: Array<ReactNode> = [];

      for (const fragmentChild of fragmentChildren) {
        if (!isValidElement(fragmentChild)) {
          filteredFragmentChildren.push(fragmentChild);
          continue;
        }

        if (
          !hasAnyStaticProperty(fragmentChild.type, staticPropertiesToExclude)
        ) {
          filteredFragmentChildren.push(fragmentChild);
        }
        // If it matches, we skip it (filter it out)
      }

      // Add filtered fragment children directly to the result (flatten the fragment)
      filteredChildren.push(...filteredFragmentChildren);
      continue;
    }

    // Filter direct children
    if (!hasAnyStaticProperty(child.type, staticPropertiesToExclude)) {
      filteredChildren.push(child);
    }
    // If it matches, we skip it (filter it out)
  }

  return filteredChildren;
};
