import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface AccordionItemProps extends HTMLElementProps<'div'> {
  /**
   * Content that is typically a pairing of an `AccordionButton` and
   * `AccordionPanel`. It can accept other components if content that
   * renders regardless of the expand and collapse on toggle is needed
   */
  children: React.ReactNode;
}
