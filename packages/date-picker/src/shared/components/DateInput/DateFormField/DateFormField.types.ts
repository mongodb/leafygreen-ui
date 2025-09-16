import React, { MouseEventHandler } from 'react';

import { FormFieldProps } from '@leafygreen-ui/form-field';

export type DateFormFieldProps = React.ComponentPropsWithRef<'div'> & {
  children: FormFieldProps['children'];
  /** Callback fired when the input is clicked */
  onInputClick?: MouseEventHandler<HTMLDivElement>;
  /** Fired then the calendar icon button is clicked */
  onIconButtonClick?: MouseEventHandler<HTMLButtonElement>;

  /** A ref for the content end button */
  buttonRef: React.RefObject<HTMLButtonElement>;
};
