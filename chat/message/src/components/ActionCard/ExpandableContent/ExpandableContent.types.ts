import { ComponentPropsWithRef } from 'react';

export interface ExpandableContentProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /**
   * The markdown content to render. Must be a string.
   */
  children: string;
}
