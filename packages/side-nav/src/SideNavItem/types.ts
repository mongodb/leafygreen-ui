import { AriaCurrentValue } from '@leafygreen-ui/lib';

export interface SideNavItemProps {
  /**
   * Whether or not the component should be rendered in an active state.
   *
   * default: `false`
   */
  active?: boolean;

  /**
   * Whether or not the component should be rendered in a disabled state.
   *
   * default: `false`
   */
  disabled?: boolean;

  /**
   * The aria-current attribute value set when the component is active.
   *
   * default: `"page"`
   */
  ariaCurrentValue?: AriaCurrentValue;

  /**
   * Class name that will be applied to the root-level element.
   */
  className?: string;

  /**
   * Content that will be rendered inside the root-level element.
   */
  children?: React.ReactNode;

  /**
   * When provided, the component will be rendered as an anchor element with the passed href value.
   */
  href?: string;

  /**
   * The event handler function for the 'onclick' event. Receives the associated `event` object as the first argument.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Icon that's rendered in the item.
   */
  glyph?: React.ReactNode;

  indentLevel?: number;

  isParentActive?: boolean;
}
