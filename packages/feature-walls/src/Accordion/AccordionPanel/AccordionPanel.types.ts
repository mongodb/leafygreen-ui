import { ComponentPropsWithRef } from 'react';

export interface AccordionPanelProps extends ComponentPropsWithRef<'div'> {
  /**
   * Content that will expand and collapse for the `AccordionItem`
   */
  children: React.ReactNode;
}
