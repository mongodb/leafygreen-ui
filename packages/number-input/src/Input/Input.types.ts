import { BaseNumberInputProps } from '../NumberInput/NumberInput.types';

export interface InputProps extends Partial<BaseNumberInputProps> {
  /**
   * Determines input styles when the select is rendered.
   */
  hasSelectOptions?: boolean;
}
