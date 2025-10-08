import { ComponentType } from 'react';

interface SubComponentStaticProperties<Key extends string> {
  displayName: string;
  key: Key;
}

export type SubComponentType<
  Key extends string,
  Props extends {} = {},
> = ComponentType<Props> & {
  [key in Key]: true;
};

/**
 * Factory function to create a compound sub-component with a static `key` property.
 * Sets the given `key` property on the resulting component to true.
 *
 * @example
 * ```tsx
 * const MySubComponent = CompoundSubComponent(() => <div />, {
 *   displayName: 'MySubComponent',
 *   key: 'isSubComponent'
 * })
 * MySubComponent.isSubComponent // true
 * ```
 *
 * @param componentRenderFn The component render function
 * @param staticProperties Object describing the `displayName` and `key`
 * @returns {SubComponentType}
 */
export const CompoundSubComponent = <Key extends string, Props extends {} = {}>(
  componentRenderFn: ComponentType<Props>,
  staticProperties: SubComponentStaticProperties<Key>,
): SubComponentType<Key, Props> => {
  const { key, ...rest } = staticProperties;
  return Object.assign(componentRenderFn, {
    ...rest,
    [key]: true,
  }) as SubComponentType<Key, Props>;
};
