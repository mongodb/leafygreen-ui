import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';
import {
  PopoverProps as ImportedPopoverProps,
  PortalControlProps,
} from '@leafygreen-ui/popover';

export const State = {
  Error: 'error',
  None: 'none',
} as const;

export type State = typeof State[keyof typeof State];

export const Size = {
  XSmall: 'xsmall',
  Small: 'small',
  Default: 'default',
} as const;

export type Size = typeof Size[keyof typeof Size];

export interface UnitOption {
  displayName: string;
  value: string;
}

type AriaLabelkeys = keyof AriaLabelPropsWithLabel;

export interface WithSelectProps {
  /**
   * The string unit that appears to the right of the input if using a single unit.
   *
   * Required if using `unitOptions`. When using `unitOptions` this value becomes the controlled value of the select input.
   *
   */
  unit: string;
  /**
   * The options that appear in the select element attached to the right of the input.
   */
  unitOptions: Array<UnitOption>;

  /**
   * Callback fired when the select value changes
   */
  onSelectChange: (unit: UnitOption) => void;
}

export interface WithoutSelectProps {
  /**
   * The string unit that appears to the right of the input if using a single unit.
   *
   * Required if using `unitOptions`. When using `unitOptions` this value becomes the controlled value of the select input.
   *
   */
  unit?: string;
  /**
   * The options that appear in the select element attached to the right of the input.
   */
  unitOptions?: never;

  /**
   * Callback fired when the select value changes
   */
  onSelectChange?: never;
}

export type SelectProps = WithSelectProps | WithoutSelectProps;

export type PopoverProps = PortalControlProps & {
  /**
   * Number that controls the z-index of the popover element directly.
   */
  popoverZIndex?: ImportedPopoverProps['popoverZIndex'];
};

export interface BaseNumberInputProps
  extends Omit<
      ComponentPropsWithoutRef<'input'>,
      'type' | AriaLabelkeys | 'size'
    >,
    DarkModeProps {
  /**
   * The current state of the input.
   *
   * @default 'none'
   */
  state?: State;

  /**
   * The current value of the input. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;

  /**
   * Callback fired when the input value changes
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * id associated with the PasswordInput component, referenced by `<label>` with the `for` attribute.
   */
  id?: string;

  /**
   * Text shown in bold above the input element.
   *
   * Optional if `aria-labelledby` is provided
   */
  label?: string;

  /**
   * Text that gives more detail about the requirements for the input.
   */
  description?: string;

  /**
   * The message shown below the input element if the value is invalid.
   */
  errorMessage?: string;

  /**
   * Determines the font size and padding.
   *
   * @default 'default'
   */
  size?: Size;
}

export type NumberInputProps = BaseNumberInputProps &
  SelectProps &
  PopoverProps &
  AriaLabelPropsWithLabel;
