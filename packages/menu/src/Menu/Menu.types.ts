import { ReactElement, ReactNode } from 'react';

import type { Either, LgIdProps } from '@leafygreen-ui/lib';
import {
  InferredPolymorphicPropsWithRef,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';
import {
  Align,
  Justify,
  PopoverProps,
  RenderMode,
} from '@leafygreen-ui/popover';

import { type SubMenuProps } from '../SubMenu/';

export { Align, Justify, RenderMode };

export type SubMenuType = ReactElement<
  InferredPolymorphicPropsWithRef<PolymorphicAs, SubMenuProps>
>;

export const MenuVariant = {
  Default: 'default',
  Compact: 'compact',
} as const;
export type MenuVariant = (typeof MenuVariant)[keyof typeof MenuVariant];

interface BaseMenuProps
  extends Omit<React.ComponentPropsWithoutRef<'ul'>, 'onClick'>,
    Omit<PopoverProps, 'active' | 'dismissMode' | 'onToggle' | 'refEl'>,
    LgIdProps {
  /**
   * The menu items, or submenus
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children: ReactNode;

  /**
   * Test id for the menu element
   */
  'data-testid'?: string;

  /**
   * A reference to the element against which the popover component will be positioned.
   */
  refEl?: React.RefObject<HTMLElement>;

  /**
   * A slot for the element used to trigger the Menu. Passing a trigger allows
   * Menu to control opening and closing itself internally.
   */
  trigger?: React.ReactElement | Function;

  /**
   * Provides an initial value to uncontrolled open/setOpen state
   *
   * default: `false`
   */
  initialOpen?: boolean;

  /**
   * Determines the open state of the menu
   *
   * default: `false`
   */
  open?: boolean;

  /**
   * Callback to change the open state of the Menu.
   *
   */
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Callback to determine whether or not Menu should close when user tries to close it.
   *
   */
  shouldClose?: () => boolean;

  /**
   * Callback fired when the Menu is opened (after the popover transition finishes)
   */
  onOpen?: () => void;

  /**
   * Callback fired when the Menu is closed (after the popover transition finishes)
   */
  onClose?: () => void;

  /**
   * The max height of the menu (in px). Defaults to 256
   */
  maxHeight?: number;

  /**
   * Determines whether or not the component will be rendered in dark mode.
   *
   * default: `false`
   */
  darkMode?: boolean;

  /**
   * id passed to the menu dropdown.
   */
  id?: string;

  /**
   * Whether the menu should always render dark, regardless of the theme context
   *
   * @default {true}
   */
  renderDarkMenu?: boolean;

  /**
   * Variant of the menu to be rendered.
   *
   * @default 'default'
   */
  variant?: MenuVariant;
}

/**
 * Menu props require at least one of `refEl` or `trigger` to be provided
 */
export type MenuProps = Either<BaseMenuProps, 'refEl' | 'trigger'>;
