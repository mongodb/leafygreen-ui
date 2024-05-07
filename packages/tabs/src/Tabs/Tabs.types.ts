import { Either, HTMLElementProps, LgIdProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface TabsProps extends HTMLElementProps<'div'>, LgIdProps {
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

  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

export type AccessibleTabsProps = Either<TabsProps, AriaLabels>;
