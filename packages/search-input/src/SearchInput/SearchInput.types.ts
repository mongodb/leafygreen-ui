import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FormEventHandler,
} from 'react';

import { AriaLabelProps } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';

export const State = {
  Unset: 'unset',
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
  extends DarkModeProps,
    Omit<ComponentPropsWithoutRef<'form'>, 'onChange'> {
  /**
   * The current state of the SearchInput. This can be none, or loading.
   */
  state?: State;

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
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the enter key is pressed.
   *
   * Ignored when there search results available
   * (in this case the enter key fires the `onClick` handler on the search result)
   */
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export type SearchInputProps = BaseSearchInputProps & AriaLabelProps;
