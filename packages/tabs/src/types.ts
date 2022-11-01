import { Either, HTMLElementProps } from '@leafygreen-ui/lib';

export interface TabsProps extends HTMLElementProps<'div'> {
  /**
   * Content that will appear inside of Tabs component.
   * Should be comprised of at least two `<Tab />` components.
   */
  children: React.ReactNode;

  /**
   * Content that will appear inline after the `<Tab />` components. `inlineChildren` are wrapped in a flexbox container.
   */
  inlineChildren?: React.ReactNode;

  /**
   * Callback to be executed when Tab is selected. Receives index of activated Tab as the first argument.
   *
   * @type (index: number) => void
   */
  setSelected?: React.Dispatch<number>;

  /**
   * Index of the Tab that should appear active. If value passed to selected prop, component will be controlled by consumer.
   */
  selected?: number;

  /**
   * determines if component will appear for Dark Mode
   * @default false
   */
  darkMode?: boolean;

  /**
   * HTML Element that wraps title in Tab List.
   *
   * @type HTMLElement | React.Component
   */
  as?: React.ElementType<any>;

  /**
   * Accessible label that describes the set of tabs
   */
  ['aria-label']?: string;

  /**
   * References id of label external to the component that describes the set of tabs
   */
  ['aria-labelledby']?: string;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

export type AccessibleTabsProps = Either<TabsProps, AriaLabels>;

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

  /**
   * TODO: remove, or do something with this
   * @internal
   */
  ariaControl?: string;

  // Done in order to support any Router system, such that TabTitle component can accept any URL destination prop.
  [key: string]: any;
}
