import { ComponentType } from 'react';

/** Generic properties applied to a Compound component */
interface CompoundComponentProperties {
  displayName: string;
  [key: string]: any; // Typed as `any` to avoid issues with a mapped object
}

/** Return type of a CompoundComponent */
export type CompoundComponentType<
  Props extends {} = {},
  Properties extends CompoundComponentProperties = CompoundComponentProperties,
> = ComponentType<Props> & Properties;

/**
 * Factory function used to create a compound component parent.
 * Applies the provided SubComponents as properties of the parent
 *
 * @example
 * ```tsx
 * const MyComponent = CompoundComponent(() => <div />, {
 *   displayName: 'MyComponent',
 *   SubComponent: MySubComponent
 * })
 *
 * <MyComponent.SubComponent /> // Renders <MySubComponent />
 * ```
 * @param componentRenderFn The component render function
 * @param properties  Object describing the `displayName` and any sub-components
 * @returns {CompoundComponentType}
 */
export const CompoundComponent = <
  Props extends {} = {},
  Properties extends CompoundComponentProperties = CompoundComponentProperties,
>(
  componentRenderFn: ComponentType<Props>,
  properties: Properties,
): CompoundComponentType<Props, Properties> => {
  return Object.assign(componentRenderFn, properties);
};
