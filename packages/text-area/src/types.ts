import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Either, HTMLElementProps } from '@leafygreen-ui/lib';

export const State = {
  None: 'none',
  Error: 'error',
} as const;

export type State = typeof State[keyof typeof State];

export const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

export type Mode = typeof Mode[keyof typeof Mode];

export type BaseTextAreaProps = HTMLElementProps<
  'textarea',
  HTMLTextAreaElement
> & {
  /**
   * ID associated with the TextArea component.
   */
  id?: string;

  /**
   * Determines whether or not the component appears in dark mode.
   * @default: false
   */
  darkMode?: boolean;

  /**
   * Text shown in bold above the input element.
   */
  label?: string | null;

  /**
   * Text that gives more detail about the requirements for the input.
   */
  description?: string;

  /**
   * Whether or not the field is currently disabled.
   * @default: false
   */
  disabled?: boolean;

  /**
   * The placeholder text shown in the input field before the user begins typing.
   */
  placeholder?: string;

  /**
   * The current state of the TextArea. This can be `none` or `error`.
   * @default: 'none'
   */
  state?: State;

  /**
   * The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;

  /**
   * The message shown below the input element if the value is invalid.
   */
  errorMessage?: string;

  /**
   *  Validation callback used to validate input.
   */
  handleValidation?: (value: string) => void;

  /**
   * Callback to be executed when the input stops being focused.
   */
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;

  /**
   * Callback to be executed when the value of the input field changes.
   */
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;

  /**
   * Override the global `baseFontSize` set in LeafygreenProvider. This will only change the font size of the input text, not the label or description
   */
  baseFontSize?: BaseFontSize;
};

export type AriaLabels = 'label' | 'aria-labelledby';
export type TextAreaProps = Either<BaseTextAreaProps, AriaLabels>;
