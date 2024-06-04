import {
  ChangeEventHandler,
  ComponentPropsWithoutRef,
  FormEventHandler,
} from 'react';

import { AriaLabelProps } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { Size } from '@leafygreen-ui/tokens';

export const State = {
  Unset: 'unset',
  Loading: 'loading',
} as const;

export type State = (typeof State)[keyof typeof State];

export { Size };

interface BaseSearchInputProps
  extends DarkModeProps,
    Omit<ComponentPropsWithoutRef<'form'>, 'onChange'>,
    Pick<
      PopoverProps,
      | 'usePortal'
      | 'portalClassName'
      | 'portalContainer'
      | 'portalRef'
      | 'scrollContainer'
    > {
  /**
   * The current state of the SearchInput. This can be none, or loading.
   */
  state?: State;

  /**
   * Determines the font size, padding and spacing.
   */
  size?: Size;

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
   * Callback fired when the input value changes.
   * Use this callback to filter the `SearchResult` options
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * Callback fired when a search result is clicked,
   * or the enter key is pressed.
   */
  onSubmit?: FormEventHandler<HTMLFormElement>;

  /**
   * The placeholder text shown in the input field before the user begins typing.
   */
  placeholder?: string;
}

export type SearchInputProps = BaseSearchInputProps & AriaLabelProps;
