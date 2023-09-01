import { MouseEventHandler } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

export const InputState = {
  Unset: 'unset',
  Error: 'error',
} as const;

export type InputState = (typeof InputState)[keyof typeof InputState];

export interface DateInputWrapperProps extends HTMLElementProps<'div'> {
  label?: string;
  description?: string;
  state?: InputState;
  errorMessage?: string;
  inputId: string;
  labelId?: string;
  descriptionId?: string;
  errorId?: string;
  /** Fired when the input wrapper is clicked (not any surrounding text) */
  onInputClick?: MouseEventHandler;
}
