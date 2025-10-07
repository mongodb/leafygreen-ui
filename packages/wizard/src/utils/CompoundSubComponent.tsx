import { FunctionComponent } from 'react';

export interface SubComponentProperties {
  displayName: string;
  [k: string]: any;
}

export type SubComponentType<
  Props extends {} = {},
  Properties extends SubComponentProperties = SubComponentProperties,
> = FunctionComponent<Props> & Properties;

export const CompoundSubComponent = <
  Props extends {} = {},
  Properties extends SubComponentProperties = SubComponentProperties,
>(
  componentRenderFn: FunctionComponent<Props>,
  properties: Properties,
): SubComponentType<Props, Properties> => {
  return Object.assign(componentRenderFn, properties);
};
