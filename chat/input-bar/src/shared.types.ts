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

/**
 * Static property names used to identify InputBar compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const InputBarSubcomponentProperty = {
  AdditionalActions: 'isLGAdditionalActions',
} as const;
export type InputBarSubcomponentProperty =
  (typeof InputBarSubcomponentProperty)[keyof typeof InputBarSubcomponentProperty];
