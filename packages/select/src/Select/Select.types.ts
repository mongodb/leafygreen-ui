import React from 'react';

import { ButtonProps } from '@leafygreen-ui/button';
import { FormFieldState } from '@leafygreen-ui/form-field';
import {
  DarkModeProps,
  Either,
  HTMLElementProps,
  LgIdProps,
} from '@leafygreen-ui/lib';
import { PopoverProps } from '@leafygreen-ui/popover';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;
export type Size = (typeof Size)[keyof typeof Size];

export const State = FormFieldState;
export type State = (typeof State)[keyof typeof State];

export const DropdownWidthBasis = {
  Trigger: 'trigger',
  Option: 'option',
} as const;

export type DropdownWidthBasis =
  (typeof DropdownWidthBasis)[keyof typeof DropdownWidthBasis];

export interface BaseSelectProps
  extends Omit<
      HTMLElementProps<'button', HTMLButtonElement>,
      'onChange' | 'onClick'
    >,
    Omit<PopoverProps, 'active' | 'spacing'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Children rendered inside the component. Expected to be either `<Option>` or `<OptionGroup>`.
   *
   * @type `<Option />` | `<OptionGroup/>`
   */
  children: React.ReactNode;

  /**
   * HTML `id` property used to allow Javascript, form, or label to reference the input.
   */
  id?: string;

  /**
   * Determines the size in which the component will be rendered.
   */
  size?: Size;

  /**
   * When present, it specifies that the drop-down list should be disabled.
   *
   * A `disabled` drop-down list is unusable and un-clickable.
   */
  disabled?: boolean;

  /**
   * Secondary text rendered under the label to provide additional details about the select and its options.
   */
  description?: React.ReactNode;

  /**
   * Text rendered in the Select component before a value is set.
   */
  placeholder?: string;

  /**
   * The `name` attribute specifies the name for a drop-down list.
   *
   * The `name` attribute is used to reference elements in a JavaScript, or to reference form data after a form is submitted.
   */
  name?: string;

  /**
   * Allows the user to unselect an option.
   */
  allowDeselect?: boolean;

  /**
   * Error message rendered when the `state` prop is set to `error`.
   */
  errorMessage?: React.ReactNode;

  /**
   * Success message rendered when the `state` prop is set to `valid`.
   */
  successMessage?: React.ReactNode;

  /**
   * Determines whether the component should be rendered in an error state.
   */
  state?: State;

  /**
   *  determines the base font size if sizeVariant is set to default.
   */
  baseFontSize?: BaseFontSize;

  /**
   *  Determines the width of the dropdown. `trigger` will make the dropdown width the width of the menu button. `option` will make the dropdown width as wide as the widest option.
   *
   * @default 'trigger'
   */
  dropdownWidthBasis?: DropdownWidthBasis;

  /**
   * @internal
   */
  __INTERNAL__menuButtonSlot__?: React.ForwardRefExoticComponent<
    React.RefAttributes<unknown>
  >;

  /**
   * @internal
   */
  __INTERNAL__menuButtonSlotProps__?: Partial<ButtonProps> &
    Record<string, any>;
}

export interface LabelProp {
  label: string;
  'aria-labelledby': string;
  'aria-label': string;
}

export type SelectProps = BaseSelectProps &
  Either<LabelProp, 'label' | 'aria-labelledby' | 'aria-label'> &
  (
    | // Uncontrolled
    ({
        /**
         * `value` makes the component a controlled component and using `defaultValue` makes it uncontrolled.
         */
        defaultValue?: string;
        /**
         * `value` makes the component a controlled component and using `defaultValue` makes it uncontrolled.
         */
        value?: undefined;
      } & {
        /**
         * A function that takes in the value of the selected option, and the event that was used to select the value (i.e. React.MouseEvent | KeyboardEvent | React.KeyboardEvent).
         *
         * Note: This API is different from the native HTML `<select>` element's `onChange` prop given the current technical design of this component.
         */
        onChange?: (
          value: string,
          event: React.MouseEvent | KeyboardEvent | React.KeyboardEvent,
        ) => void;
        /**
         * Indicates that the component's value cannot be changed.
         */
        readOnly?: false;
      })
    // Controlled
    | ({ value: string; defaultValue?: undefined } & (
        | {
            /**
             * A function that takes in the value of the selected option, and the event that was used to select the value (i.e. React.MouseEvent | KeyboardEvent | React.KeyboardEvent).
             *
             * Note: This API is different from the native HTML `<select>` element's `onChange` prop given the current technical design of this component.
             */
            onChange: (
              value: string,
              event: React.MouseEvent | KeyboardEvent | React.KeyboardEvent,
            ) => void;
            readOnly?: false;
          }
        | { readOnly: true; onChange?: undefined }
      ))
  );
