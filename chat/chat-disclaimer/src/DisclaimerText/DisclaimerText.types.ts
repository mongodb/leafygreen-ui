import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';

export interface DisclaimerTextProps
  extends DarkModeProps,
    HTMLElementProps<'div'> {
  /**
   * Heading text
   */
  title?: string;
}
