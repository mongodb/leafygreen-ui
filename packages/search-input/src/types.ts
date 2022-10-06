import { HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const State = {
  None: 'none',
  Loading: 'loading',
} as const;

export type State = typeof State[keyof typeof State];

export const SizeVariant = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type SizeVariant = typeof SizeVariant[keyof typeof SizeVariant];

export interface SearchInputProps
  extends HTMLElementProps<'input', HTMLInputElement> {
  /**
   * id associated with the SearchInput component.
   */
  id?: string;

  /**
   * Screen-reader label element.
   *
   */
  ['aria-labelledby']: string;

  /**
   * Callback to be executed when the input stops being focused.
   */
  onBlur?: React.FocusEventHandler<HTMLInputElement>;

  /**
   * Callback to be executed when the value of the input field changes.
   */
  onChange?: React.ChangeEventHandler<HTMLInputElement>;

  /**
   * The placeholder text shown in the input field before the user begins typing.
   */
  placeholder?: string;

  /**
   * The current state of the SearchInput. This can be none, or loading.
   */
  state?: State;

  /**
   * The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;

  /**
   * className supplied to the SearchInput container.
   */
  className?: string;

  /**
   *  determines whether or not the component appears in dark theme.
   */
  darkMode?: boolean;

  /**
   *  determines the font size and padding.
   */

  sizeVariant?: SizeVariant;

  /**
   *  determines the base font size if sizeVariant is set to default.
   */

  baseFontSize?: BaseFontSize;
}
