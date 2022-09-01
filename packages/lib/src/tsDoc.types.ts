import { Props, ComponentDoc } from 'react-docgen-typescript';
export const InheritablePropGroup = [
  'HTMLAttributes',
  'DOMAttributes',
  'AriaAttributes',
] as const;
export type InheritablePropGroup = keyof typeof InheritablePropGroup;
export type PropCategory = Record<InheritablePropGroup | string, Props>;
export type CustomComponentDoc = Omit<ComponentDoc, 'props'> & {
  props: PropCategory;
};
