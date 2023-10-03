import { HTMLElementProps } from '@leafygreen-ui/lib';

import { FormFieldChildren } from '../FormField.types';

export interface FormFieldInputProps extends HTMLElementProps<'div'> {
  children: FormFieldChildren;
  icon?: React.ReactElement;
}
