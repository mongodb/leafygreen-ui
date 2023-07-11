import React from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';

export const DeprecatedSize = {
  /** @deprecated */
  Small: 'small',
} as const;

export type DeprecatedSize = typeof DeprecatedSize[keyof typeof DeprecatedSize];

export const Size = {
  XSmall: 'xsmall',
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

export interface SegmentedControlProps
  extends Omit<HTMLElementProps<'div'>, 'onChange'> {
  /**
   * Options provided in the segmented control
   *
   * @type `<SegmentedControlOption />`
   */
  children: React.ReactNode;

  /**
   * Defines the size of the segmented control. Can be either `xsmall`, `default`, or `large`
   */
  size?: Size | DeprecatedSize;

  /**
   * Toggles dark mode
   */
  darkMode?: boolean;

  /**
   * Defines the default, or initial value of the component. Ignored if `value` is also provided.
   */
  defaultValue?: string;

  /**
   * Controls the value of the component.
   * If provided, you must update the value in the `onChange` method,
   * or other user actions (such as routing)
   */
  value?: string;

  /**
   * A text label to the left of the segmented control. Sets the `name` prop if none is provided.
   */
  label?: React.ReactNode;

  /**
   * Identifies the segmented control group to screen readers. Auto-generated if no `name` or `label` is provided.
   *
   * It's recommended for accessability to set this to a meaningful value.
   */
  name?: string;

  /**
   * Defines whether the selection should automatically follow focus.
   * If set to true, the arrow keys can be used to switch selection,
   * otherwise a keyboard user will need to press enter to make a selection.
   *
   * Default: `true`
   */
  followFocus?: boolean;

  /**
   * Identifies the element(s) whose contents/presence is controlled by the segmented control.
   *
   * Required as a prop on the control, or on each individual option.
   */
  'aria-controls'?: string;

  /**
   * Callback that gets called when a user makes a new selection.
   */
  onChange?: (value: string) => void;
}
