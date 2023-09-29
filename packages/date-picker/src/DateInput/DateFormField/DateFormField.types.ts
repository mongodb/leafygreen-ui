import { MouseEventHandler } from 'react';

import { FormFieldProps } from '@leafygreen-ui/form-field';

export const InputState = {
  Unset: 'unset',
  Error: 'error',
} as const;

export type InputState = (typeof InputState)[keyof typeof InputState];

export type DateFormFieldProps = FormFieldProps & {
  /** Fired then the calendar icon button is clicked */
  onIconButtonClick?: MouseEventHandler<HTMLButtonElement>;
};
