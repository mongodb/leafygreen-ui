import { HTMLElementProps } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import { FormFieldChildren, FormFieldState } from '../FormField.types';

export interface FormFieldInputWrapperProps
  extends Omit<HTMLElementProps<'div'>, 'children'> {
  input: FormFieldChildren;
  disabled: boolean;
  size: Size;
  state: FormFieldState;
  icon?: React.ReactElement;
}
