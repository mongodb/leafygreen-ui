import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface TabProps extends HTMLElementProps<'div'> {
  /**
   * Content that will appear as the title in the Tab list.
   */
  name: React.ReactNode;

  /**
   * Content that will appear inside of Tab panel.
   */
  children?: React.ReactNode;

  /**
   * Boolean that determines if the Tab is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * If Tabs component is uncontrolled, this determines what Tab will be selected on first render.
   */
  default?: boolean;

  /**
   * Adds a className to the root element.
   */
  className?: string;

  /**
   * Destination when name is rendered as `a` tag.
   */
  href?: string;

  /**
   * Destination when name is rendered as `Link` tag.
   */
  to?: string;

  /**
   * Whether this tab is currently selected
   */
  selected?: boolean;

  // Done in order to support any Router system, such that TabTitle component can accept any URL destination prop.
  [key: string]: any;
}
