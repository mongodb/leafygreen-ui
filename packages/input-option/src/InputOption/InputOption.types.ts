import { PropsWithChildren } from 'react';

import { AriaLabelProps } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';

const CheckedVariant = {
  Blue: 'blue',
  Green: 'green',
} as const;

type CheckedVariant = (typeof CheckedVariant)[keyof typeof CheckedVariant];

export { CheckedVariant };

const ActionType = {
  Default: 'default',
  Destructive: 'destructive',
} as const;

type ActionType = (typeof ActionType)[keyof typeof ActionType];

export { ActionType };

/**
 * TERMINOLOGY
 *
 * `focused`: The element is "focused" via keyboard navigation
 * (Does not mean `:focus`, since input options are not focused in this sense)
 *
 * `active`: The element is selected, or otherwise active (including `:active`)
 */
export interface BaseInputOptionProps {
  /**
   * Prevents the option from being selectable.
   * @default false
   */
  disabled?: boolean;

  /**
   * Defines the currently highlighted option element for keyboard navigation.
   * Not to be confused with `selected`, which identifies the currently selected option
   * @default false
   */
  highlighted?: boolean;

  /**
   * Whether the component is checked, regardless of keyboard navigation
   */
  checked?: boolean;

  /**
   * Whether a wedge displays on the left side of the item
   * when the element is highlighted or selected
   * @default true
   */
  showWedge?: boolean;

  /**
   * Determines whether to show hover, highlight and selected styles
   * @default true
   */
  isInteractive?: boolean;

  /**
   * Determines styles when input option is "checked"
   * @default: 'blue'
   */
  checkedVariant?: CheckedVariant;

  /**
   * Styles input based on intended action
   * @default 'default'
   */
  actionType?: ActionType;

  isMenu: boolean;
}

export type InputOptionProps = AriaLabelProps &
  DarkModeProps &
  PropsWithChildren<BaseInputOptionProps>;
