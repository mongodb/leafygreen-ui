import { HTMLElementProps } from '@leafygreen-ui/lib';

export interface TabProps extends HTMLElementProps<'div'> {
  /**
   * Content that will appear inside of Tab panel.
   * /
  children?: React.ReactNode;

  /**
   * Adds a className to the root element.
  */
  className?: string;

  /**
   * If Tabs component is uncontrolled, this determines what Tab will be selected on first render.
   */
  default?: boolean;

  /**
   * Boolean that determines if the Tab is disabled.
   * @default false
   */
  disabled?: boolean;

  /**
   * Destination when name is rendered as `a` tag.
   */
  href?: string;

  /**
   * The index of the Tab instance. The index of the initially selected Tab is required in SSR environments to ensure
   * the Tab is selected on initial render.
   */
  index?: number;

  /**
   * Content that will appear as the title in the Tab list.
   */
  name: React.ReactNode;

  /**
   * Whether this tab is currently selected
   */
  selected?: boolean;

  /**
   * Destination when name is rendered as `Link` tag.
   */
  to?: string;

  // Done in order to support any Router system, such that TabTitle component can accept any URL destination prop.
  [key: string]: any;
}
