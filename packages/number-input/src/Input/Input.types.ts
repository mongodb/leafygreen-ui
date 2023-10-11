import { BaseNumberInputProps } from '../NumberInput/NumberInput.types';

export interface InputProps extends Omit<BaseNumberInputProps, 'size'> {
  /**
   * Determines input styles when the select is rendered.
   */
  hasSelectOptions?: boolean;
}
