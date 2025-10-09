import { ComponentType } from 'react';

/**
 * Type for things that might have static properties.
 * Includes React component types (functions/objects), HTML tag names (strings), and null/undefined.
 */
type ComponentLike =
  | string // HTML elements like "div", "span"
  | ComponentType // Function components
  | Record<string, any> // Object components (styled components, etc.)
  | null
  | undefined;

/**
 * Check if a component has the specified static property.
 * Handles React components, styled components, HTML elements, and forwardRef components.
 *
 * @param component The component to check (React component, HTML tag name, or null/undefined)
 * @param staticProperty The static property name to check for
 * @returns True if the component has the static property
 *
 * @example
 * ```ts
 * // Regular component
 * const MyComponent = () => <div />;
 * MyComponent.isMyComponent = true;
 * hasStaticProperty(MyComponent, 'isMyComponent'); // true
 *
 * // Styled component
 * const StyledComponent = styled(MyComponent)`color: red;`;
 * hasStaticProperty(StyledComponent, 'isMyComponent'); // true (via .target)
 *
 * // HTML element (returns false)
 * hasStaticProperty('div', 'someProp'); // false
 * ```
 */
export function hasStaticProperty(
  component: ComponentLike,
  staticProperty: string,
): boolean {
  if (!component || typeof component === 'string') return false;

  return !!(
    (component as any)[staticProperty] || // Direct property on component
    (component as any).target?.[staticProperty] || // Standard styled() components: original component is stored in .target
    // For components created by styled() wrapping a component that uses React.forwardRef,
    // Emotion does NOT hoist static properties to the styled wrapper. Instead, the original
    // component is stored in .__emotion_base, and static properties must be checked there.
    // This is required for correct detection when styled wraps a forwardRef component.
    (component as any).__emotion_base?.[staticProperty]
  );
}

/**
 * Check if a component has any of the specified static properties.
 * Handles React components, styled components, HTML elements, and forwardRef components.
 *
 * @param component The component to check (React component, HTML tag name, or null/undefined)
 * @param staticProperties Array of static property names to check for
 * @returns True if the component has any of the static properties
 *
 * @example
 * ```ts
 * // Check multiple properties
 * const MyComponent = () => <div />;
 * MyComponent.isButton = true;
 * hasAnyStaticProperty(MyComponent, ['isButton', 'isInput']); // true
 * hasAnyStaticProperty(MyComponent, ['isInput', 'isSelect']); // false
 * ```
 */
export function hasAnyStaticProperty(
  component: ComponentLike,
  staticProperties: Array<string>,
): boolean {
  return staticProperties.some(property =>
    hasStaticProperty(component, property),
  );
}
