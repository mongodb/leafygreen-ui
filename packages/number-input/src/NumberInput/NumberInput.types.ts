import { ChangeEventHandler, ComponentPropsWithoutRef } from 'react';

import { AriaLabelPropsWithLabel } from '@leafygreen-ui/a11y';
import { State } from '@leafygreen-ui/input-base';
import { DarkModeProps } from '@leafygreen-ui/lib';

export type StateProp = Exclude<State, 'warning' | 'valid'>;

export const Size = {
  Small: 'small',
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

type AriaLabelkeys = keyof AriaLabelPropsWithLabel;

export interface NumberInputProps
  extends Omit<
      ComponentPropsWithoutRef<'input'>,
      'type' | AriaLabelkeys | 'aria-describedby' | 'size'
    >,
    DarkModeProps {
  /**
   * The current state of the input.
   *
   * @default 'none'
   */
  state: StateProp;

  /**
   * The current value of the input. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;

  /**
   * Callback fired when the input value changes
   */
  onChange?: ChangeEventHandler<HTMLInputElement>;

  /**
   * Callback fired when the select value changes
   */
  onSelectChange?: ChangeEventHandler<HTMLSelectElement>;

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
   * The message shown below the input element if the value is invalid.
   */
  errorMessage?: string;

  /**
   * Determines the font size and padding.
   */
  size?: Size;

  /**
   * Specifies that the popover content should be rendered at the end of the DOM,
   * rather than in the DOM tree.
   *
   * default: `true`
   */
  usePortal?: boolean;

  /**
   * When usePortal is `true`, specifies a class name to apply to the root element of the portal.
   */
  portalClassName?: string;

  /**
   * When usePortal is `true`, specifies an element to portal within. The default behavior is to generate a div at the end of the document to render within.
   */
  portalContainer?: HTMLElement | null;

  /**
   * When usePortal is `true`, specifies the scrollable element to position relative to.
   */
  scrollContainer?: HTMLElement | null;

  /**
   * Number that controls the z-index of the popover element directly.
   */
  popoverZIndex?: number;
}
