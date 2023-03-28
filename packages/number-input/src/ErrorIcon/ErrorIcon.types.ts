import { Size } from '../NumberInput/NumberInput.types';

export interface ErrorIconProps {
  /**
   * Determines if buttons should be disabled
   */
  disabled: boolean;

  /**
   * Determines if the error icon should appear
   */
  shouldRenderErrorIcon: boolean;

  /**
   * Determines the font size and padding.
   *
   * @default 'default'
   */
  size: Size;

  /**
   * Determines when the error icon should have transitions applied to it.
   */
  shouldErrorTransition: boolean;
}
