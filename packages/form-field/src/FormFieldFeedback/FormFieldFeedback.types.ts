import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';

export interface FormFieldFeedbackProps extends HTMLElementProps<'div'> {
  /**
   * Base font size of the component. Only effective when `size == 'default'`
   */
  baseFontSize?: BaseFontSize;

  /**
   * Defines whether the component is disabled
   */
  disabled: boolean;

  /**
   * The message to display when in an error state
   */
  errorMessage: React.ReactNode;

  /**
   * Defines if feedback should forcibly be hidden
   * @default false
   */
  hideFeedback?: boolean;

  /**
   * The id of the container div
   */
  id?: string;

  /**
   * The size of the component
   */
  size: Size;

  /**
   * The state of the form field
   */
  state: FormFieldState;

  /**
   * The message to display when in a valid state
   */
  successMessage: React.ReactNode;
}
