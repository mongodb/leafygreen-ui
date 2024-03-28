import React from 'react';

import {
  DarkModeProps,
  Either,
  HTMLElementProps,
  LgIdProps,
} from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const State = {
  None: 'none',
  Error: 'error',
} as const;

export type State = (typeof State)[keyof typeof State];

export interface BaseTextAreaProps
  extends HTMLElementProps<'textarea', HTMLTextAreaElement>,
    DarkModeProps,
    LgIdProps {
  /**
   * ID associated with the TextArea component.
   */
  id?: string;

  /**
   * Text shown in bold above the input element.
   *
   * Optional if `aria-labelledby` is provided
   */
  label?: string | null;

  /**
   * Text that gives more detail about the requirements for the input.
   */
  description?: React.ReactNode;

  /**
   * Whether or not the field is currently disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * The placeholder text shown in the input field before the user begins typing.
   */
  placeholder?: string;

  /**
   * The current state of the TextArea. This can be `none` or `error`.
   * @default "none"
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
   * Callback called whenever validation should be run.
   *
   * See [Form Validation & Error Handling](https://www.mongodb.design/foundation/forms/#form-validation--error-handling) for more
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

  /**
   * Screen-reader label element
   *
   * Optional if `label` is provided
   */
  ['aria-labelledby']: string;
}

export type AriaLabels = 'label' | 'aria-labelledby';
export type TextAreaProps = Either<BaseTextAreaProps, AriaLabels>;
