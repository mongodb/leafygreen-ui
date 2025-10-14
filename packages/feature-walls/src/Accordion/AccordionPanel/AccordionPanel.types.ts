import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface AccordionPanelProps extends HTMLElementProps<'div'> {
  /**
   * Content that will expand and collapse for the `AccordionItem`
   */
  children: React.ReactNode;
}
