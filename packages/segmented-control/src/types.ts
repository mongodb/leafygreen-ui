import { HTMLElementProps } from '@leafygreen-ui/lib';
import { ReactElement } from 'react';

export const Size = {
  Small: 'small',
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
   * Defines the size of the segmented control. Can be either `small`, `default`, or `large`
   */
  size?: Size;

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
  label?: string;

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

export interface SegmentedControlOptionProps extends HTMLElementProps<'div'> {
  /**
   * Can be text and/or an icon element
   */
  children?: React.ReactNode;

  /**
   * The value of the option
   */
  value: string;

  /**
   * The icon to display to the left of the option.
   * @type `<Icon />`
   */
  glyph?: ReactElement;

  /**
   * Toggles whether the option is disabled. Defaults to `false`
   */
  disabled?: boolean;

  /**
   * Render the option wrapped in another component. Typically used for router `Link` components.
   *
   * Default: `div`
   */
  as?: any;

  /**
   * Identifies the element(s) whose contents/presence is controlled by the segmented control.
   *
   * Required as a prop on the control, or on each individual option.
   */
  'aria-controls'?: string;

  /**
   * @internal
   * A unique identifier for the option
   */
  _id?: string;

  /**
   * @internal
   * Identifies whether the option is checked.
   */
  _checked?: boolean;

  /**
   * @internal
   * Identifies whether the option has focus
   */
  _focused?: boolean;

  /**
   * @internal
   * The index of the option
   */
  _index?: number;

  /**
   * @internal
   * Calls the onChange callback
   */
  _onClick?: (value: string) => void;

  /**
   * @internal
   * Fires on mouse in and out
   */
  _onHover?: (hovered: boolean) => void;

  /**
   * @internal
   */
  isfocusInComponent?: boolean;
}
