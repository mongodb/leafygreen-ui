import { MouseEventHandler } from 'react';

import { FormFieldProps } from '@leafygreen-ui/form-field';
import { HTMLElementProps } from '@leafygreen-ui/lib';

export const InputState = {
  Unset: 'unset',
  Error: 'error',
} as const;

export type InputState = (typeof InputState)[keyof typeof InputState];

export type DateFormFieldProps = HTMLElementProps<'div'> & {
  children: FormFieldProps['children'];
  /** Callback fired when the input is clicked */
  onInputClick?: MouseEventHandler<HTMLDivElement>;
  /** Fired then the calendar icon button is clicked */
  onIconButtonClick?: MouseEventHandler<HTMLButtonElement>;
};
