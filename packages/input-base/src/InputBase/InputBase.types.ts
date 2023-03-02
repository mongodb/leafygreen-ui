import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export const State = {
  Error: 'error',
  Warning: 'warning',
  Valid: 'valid',
  None: 'none',
} as const;

export type State = typeof State[keyof typeof State];

export interface InputBaseProps
  extends ComponentPropsWithoutRef<'input'>,
    DarkModeProps {
  state?: State;

  onChange?: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;

  /**
   * The current value of the input.
   */
  value?: string;
}
