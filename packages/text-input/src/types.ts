import { HTMLElementProps, Either, DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const State = {
  None: 'none',
  Valid: 'valid',
  Error: 'error',
} as const;

export type State = typeof State[keyof typeof State];

export const TextInputType = {
  Email: 'email',
  Password: 'password',
  Search: 'search',
  Text: 'text',
  Url: 'url',
  Tel: 'tel',
  Number: 'number',
} as const;

export type TextInputType = typeof TextInputType[keyof typeof TextInputType];

export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

export const SizeVariant = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type SizeVariant = typeof SizeVariant[keyof typeof SizeVariant];

export const TextInputFontSize = {
  ...BaseFontSize,
  Large: 18,
} as const;

export type TextInputFontSize =
  typeof TextInputFontSize[keyof typeof TextInputFontSize];

export interface BaseTextInputProps
  extends HTMLElementProps<'input', HTMLInputElement>, DarkModeProps {
  /**
   * id associated with the TextInput component.
   */
  id?: string;

  /**
   * Text shown in bold above the input element.
   */
  label?: string | null;

  /**
   * Text that gives more detail about the requirements for the input.
   */
  description?: string;

  /**
   * Whether or not the field is optional.
   * Default: false
   */
  optional?: boolean;

  /**
   * Whether or not the field is currently disabled.
   * Default: false
   */
  disabled?: boolean;

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
   * The message shown below the input field if the value is invalid.
   */
  errorMessage?: string;

  /**
   * The current state of the TextInput. This can be none, valid, or error.
   */
  state?: State;

  /**
   * The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;

  /**
   * className supplied to the TextInput container.
   */
  className?: string;

  type?: TextInputType;

  handleValidation?: (value: string) => void;

  ['aria-labelledby']?: string;

  /**
   *  determines the font size and padding.
   */

  sizeVariant?: SizeVariant;

  /**
   *  determines the base font size if sizeVariant is set to default.
   */

  baseFontSize?: BaseFontSize;
}

type AriaLabels = 'label' | 'aria-labelledby';
export type TextInputProps =
  | Either<BaseTextInputProps, AriaLabels>
  | (BaseTextInputProps & { type: 'search'; 'aria-label': string });
