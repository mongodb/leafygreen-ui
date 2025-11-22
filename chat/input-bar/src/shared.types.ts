import { ReactNode } from 'react';

export const State = {
  Unset: 'unset',
  Error: 'error',
  Loading: 'loading',
} as const;
export type State = (typeof State)[keyof typeof State];

export interface SharedInputBarProps {
  /**
   * Custom error message to display when `state='error'`
   */
  errorMessage?: ReactNode;

  /**
   * The current state of the InputBar. This can be `'unset'`, `'error'`, or `'loading'`
   */
  state?: State;
}
