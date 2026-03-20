import { ComponentType } from 'react';

interface SubComponentStaticProperties<Key extends string> {
  displayName: string;
  key: Key;
  [key: string]: any; // Allow additional properties like sub-components
}

export type SubComponentType<
  Key extends string,
  Props extends {} = {},
  StaticProperties extends SubComponentStaticProperties<Key> = SubComponentStaticProperties<Key>,
> = ComponentType<Props> &
  Omit<StaticProperties, 'key'> & {
    [key in Key]: true;
  };

/**
 * Factory function to create a compound sub-component with a static `key` property.
 * Sets the given `key` property on the resulting component to true.
 *
 * Can optionally accept additional static properties (like sub-components) to create
 * hierarchical compound components without nesting CompoundComponent calls.
 *
 * @example
 * Basic usage:
 * ```tsx
 * const MySubComponent = CompoundSubComponent(() => <div />, {
 *   displayName: 'MySubComponent',
 *   key: 'isSubComponent'
 * })
 * MySubComponent.isSubComponent // true
 * ```
 *
 * @example
 * With nested sub-components:
 * ```tsx
 * const Header = CompoundSubComponent(() => <div />, {
 *   displayName: 'Header',
 *   key: 'isHeader'
 * })
 *
 * const MySubComponent = CompoundSubComponent(() => <div />, {
 *   displayName: 'MySubComponent',
 *   key: 'isSubComponent',
 *   Header, // Attach sub-components directly
 * })
 *
 * MySubComponent.isSubComponent // true
 * MySubComponent.Header // Header component
 * ```
 *
 * @param componentRenderFn The component render function
 * @param staticProperties Object describing the `displayName`, `key`, and optional sub-components
 * @returns {SubComponentType}
 */
export const CompoundSubComponent = <
  Key extends string,
  Props extends {} = {},
  StaticProperties extends SubComponentStaticProperties<Key> = SubComponentStaticProperties<Key>,
>(
  componentRenderFn: ComponentType<Props>,
  staticProperties: StaticProperties,
): SubComponentType<Key, Props, StaticProperties> => {
  const { key, ...rest } = staticProperties;
  return Object.assign(componentRenderFn, {
    ...rest,
    [key]: true,
  }) as SubComponentType<Key, Props, StaticProperties>;
};
