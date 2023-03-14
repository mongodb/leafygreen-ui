import { NumberInputProps } from '../NumberInput/NumberInput.types';

export interface InputProps extends Partial<NumberInputProps> {
  /**
   * Determines input styles when the select is rendered.
   */
  hasSelectOptions?: boolean;
} // TODO: omit popover props
