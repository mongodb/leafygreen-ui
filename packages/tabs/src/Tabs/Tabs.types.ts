import {
  DarkModeProps,
  Either,
  HTMLElementProps,
  LgIdProps,
} from '@leafygreen-ui/lib';
import { PolymorphicAs } from '@leafygreen-ui/polymorphic';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface TabsProps
  extends HTMLElementProps<'div'>,
    DarkModeProps,
    LgIdProps {
  /**
   * Accessible label that describes the set of tabs
   */
  ['aria-label']?: string;

  /**
   * References id of label external to the component that describes the set of tabs
   */
  ['aria-labelledby']?: string;

  /**
   * HTML Element that wraps title in Tab List.
   */
  as?: PolymorphicAs;

  /**
   * The base font size of the title and text rendered in children.
   */
  baseFontSize?: BaseFontSize;

  /**
   * Content that will appear inside of Tabs component.
   * Should be comprised of at least two `<Tab />` components.
   */
  children: React.ReactNode;

  /**
   * When set to true, all tab panels will forcibly render in DOM.
   * Tab panels that are not selected will be hidden with `display: none;`
   * This will not apply for disabled tabs
   *
   * @default false
   */
  forceRenderAllTabPanels?: boolean;

  /**
   * Content that will appear inline after the `<Tab />` components. `inlineChildren` are wrapped in a flexbox container.
   */
  inlineChildren?: React.ReactNode;

  /**
   * Index of the Tab that should appear active. If value passed to selected prop, component will be controlled by consumer.
   */
  selected?: number;

  /**
   * Callback to be executed when Tab is selected. Receives index of activated Tab as the first argument.
   *
   * @type (index: number) => void
   */
  setSelected?: React.Dispatch<number>;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

export type AccessibleTabsProps = Either<TabsProps, AriaLabels>;
