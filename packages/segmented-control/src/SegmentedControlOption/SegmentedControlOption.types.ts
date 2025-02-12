import { ReactElement } from 'react';

import { HTMLElementProps } from '@leafygreen-ui/lib';
import { PolymorphicAs, PolymorphicProps } from '@leafygreen-ui/polymorphic';

export interface BaseSegmentedControlOptionProps
  extends HTMLElementProps<'div'> {
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
  isFocusInComponent?: boolean;
}

// External only
export type SegmentedControlOptionProps<TAsProp extends PolymorphicAs = 'div'> =
  PolymorphicProps<TAsProp, BaseSegmentedControlOptionProps>;
