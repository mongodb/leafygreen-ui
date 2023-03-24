import { Size } from '../NumberInput/NumberInput.types';

export interface ErrorIconProps {
  /**
   * Determines if buttons should be disabled
   */
  disabled: boolean;

  /**
   * Determines if the error icon should appear
   */
  renderErrorIcon: boolean;

  size: Size;
}
