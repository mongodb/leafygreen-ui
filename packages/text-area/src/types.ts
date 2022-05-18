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
  id?: string;
  darkMode?: boolean;
  label?: string | null;
  description?: string;
  state?: State;
  errorMessage?: string;
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
   * Override the global `baseFontSize` set in LeafygreenProvider
   */
  baseFontSize?: BaseFontSize;
};

export type AriaLabels = 'label' | 'aria-labelledby';
export type TextAreaProps = Either<BaseTextAreaProps, AriaLabels>;
