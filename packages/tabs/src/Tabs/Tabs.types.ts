import {
  DarkModeProps,
  Either,
  HTMLElementProps,
  LgIdProps,
} from '@leafygreen-ui/lib';
import { PolymorphicAs } from '@leafygreen-ui/polymorphic';
import { BaseFontSize } from '@leafygreen-ui/tokens';

/**
 * Size variants
 *
 * @default 'default'
 */
export const Size = {
  Small: 'small',
  Default: 'default',
} as const;

export type Size = (typeof Size)[keyof typeof Size];

export interface TabsProps<SelectedType extends number | string>
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
   * Content that will appear inline after the `<Tab />` components.
   * `inlineChildren` are wrapped in a flexbox container.
   */
  inlineChildren?: React.ReactNode;

  /**
   * Event handler called when the selected tab changes. This is only invoked if the
   * `value` prop is defined.
   */
  onValueChange?: (value: SelectedType) => void;

  /**
   * The size of the title. `size='small'` overrides `baseFontSize` to
   * `BaseFontSize.Body1`
   *
   * @default 'default'
   */
  size?: Size;

  /**
   * Index or name of the selected tab. If using the name, pass the text content from
   * the `Tab` instance's `name` prop. Providing this prop will switch the `Tabs`
   * instance to controlled mode. If a value that cannot be found is provided, nothing
   * will be selected.
   */
  value?: SelectedType;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

export type AccessibleTabsProps<SelectedType extends number | string = number> =
  Either<TabsProps<SelectedType>, AriaLabels>;
