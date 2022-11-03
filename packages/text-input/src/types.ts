import { HTMLElementProps, Either } from '@leafygreen-ui/lib';
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
  extends HTMLElementProps<'input', HTMLInputElement> {
  /**
   * id associated with the TextInput component.
   */
  id?: string;

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

  /**
   *  determines whether or not the component appears in dark theme.
   */
  darkMode?: boolean;

  /**
   * The input type.
   *
   * Requires an `aria-label` if `"search"` is provided
   */
  type?: TextInputType;

  /**
   * Callback called whenever validation should be run.
   *
   * See [Form Validation & Error Handling](https://www.mongodb.design/foundation/forms/#form-validation--error-handling) for more
   */
  handleValidation?: (value: string) => void;

  /**
   *  determines the font size and padding.
   */

  sizeVariant?: SizeVariant;

  /**
   *  determines the base font size if sizeVariant is set to default.
   */

  baseFontSize?: BaseFontSize;
}

interface AriaLabelProps {
  /**
   * Text shown in bold above the input element.
   *
   * Optional if `aria-labelledby` is provided
   */
  label: string | null;

  /**
   * Screen-reader label element.
   *
   * Optional if `label` is provided
   */
  ['aria-labelledby']: string;
}

export type TextInputProps =
  | Either<BaseTextInputProps & AriaLabelProps, keyof AriaLabelProps>
  | (BaseTextInputProps & {
      type: 'search';
      /**
       * Required if `type` is `"search"`
       */
      'aria-label': string;
    });
