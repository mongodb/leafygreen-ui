import { BaseNumberInputProps } from '../NumberInput/NumberInput.types';

export interface InputProps
  extends Partial<
    Omit<BaseNumberInputProps, 'inputClassName' | 'label' | 'description'>
  > {
  /**
   * Determines input styles when the select is rendered.
   */
  hasSelectOptions?: boolean;
}
