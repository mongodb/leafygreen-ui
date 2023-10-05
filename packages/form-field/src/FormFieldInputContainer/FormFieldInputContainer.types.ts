import { HTMLElementProps } from '@leafygreen-ui/lib';

import { FormFieldChildren } from '../FormField/FormField.types';

export interface FormFieldInputContainerProps extends HTMLElementProps<'div'> {
  /**
   * Must pass a single element in order to label the input element appropriately
   */
  children: FormFieldChildren;

  /**
   * The icon rendered on the right of the input box
   */
  icon?: React.ReactElement;
}
