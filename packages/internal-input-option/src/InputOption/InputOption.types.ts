import { AriaLabelProps } from '@leafygreen-ui/a11y';
import { DarkModeProps } from '@leafygreen-ui/lib';

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
   * Content to appear inside of option
   */
  children?: React.ReactNode;

  /**
   * Prevents the option from being selectable.
   * @default false
   */
  disabled?: boolean;

  /**
   * Defines the currently focused option element for keyboard navigation.
   * Not to be confused with `selected`, which identifies the currently selected option
   * @default false
   */
  focused?: boolean;

  /**
   * Whether a wedge displays on the left side of the item
   * when the element is focused or active
   * @default true
   */
  showWedge?: boolean;

  /**
   * Whether the component is active, regardless of keyboard navigation
   */
  active?: boolean;
}

export type InputOptionProps = AriaLabelProps &
  DarkModeProps &
  BaseInputOptionProps;
