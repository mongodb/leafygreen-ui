import { ValidationState } from '../types';

export type AriaLabels = { label?: string } & Pick<
  JSX.IntrinsicElements['label'],
  'aria-label' | 'aria-labelledby'
>;

export interface LabelProps extends AriaLabels {
  id?: string;
}

export interface AccessibleFieldProps extends AriaLabels {
  id?: string;
  description?: string;
  errorMessage?: string;
  validationState?: ValidationState;
  ['aria-describedby']?: string;
}
