import { ComponentPropsWithRef } from 'react';

export interface AccordionButtonProps extends ComponentPropsWithRef<'button'> {
  /**
   * Content, typically a text string, that serves as a trigger handling the
   * collapsible behavior of the corresponding panel content
   */
  children: React.ReactNode;

  /**
   * Optional callback that is fired when the button is expanded
   */
  onExpand?: () => void;
}
