import { FunctionComponent } from 'react';

/** Generic properties applied to a Compound component */
export interface CompoundComponentProperties {
  displayName: string;
  [key: string]: any; // Typed as `any` to avoid issues with a mapped object
}

/** Return type of a CompoundComponent */
export type CompoundComponentType<
  Props extends {} = {},
  Properties extends CompoundComponentProperties = CompoundComponentProperties,
> = FunctionComponent<Props> & Properties;

/**
 * Factory function used to create a compound component parent
 * @returns {CompoundComponentType}
 */
export const CompoundComponent = <
  Props extends {} = {},
  Properties extends CompoundComponentProperties = CompoundComponentProperties,
>(
  componentRenderFn: FunctionComponent<Props>,
  properties: Properties,
): CompoundComponentType<Props, Properties> => {
  return Object.assign(componentRenderFn, properties);
};
