import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { AriaLabelProps } from '@leafygreen-ui/a11y';

export const State = {
  None: 'none',
  Loading: 'loading',
} as const;

export type State = typeof State[keyof typeof State];

export const SizeVariant = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type SizeVariant = typeof SizeVariant[keyof typeof SizeVariant];

interface BaseSearchInputProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'onChange'> {
  /**
   * The current state of the SearchInput. This can be none, or loading.
   */
  state?: State;

  /**
   * Determines whether the component appears in dark theme.
   */
  darkMode?: boolean;

  /**
   * Determines the font size and padding.
   */

  sizeVariant?: SizeVariant;

  /**
   * Determines whether the field is currently disabled.
   * Default: false
   */
  disabled?: boolean;

  /**
   * The current value of the text box
   */
  value?: string;

  /**
   * Callback fired when the input value changes
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
}

export type SearchInputProps = BaseSearchInputProps & AriaLabelProps;
