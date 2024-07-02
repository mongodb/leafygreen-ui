import { type Dispatch, type SetStateAction } from 'react';
import { ExitHandler } from 'react-transition-group/Transition';

import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';

import { MenuItemProps } from '../MenuItem';

export interface InternalSubMenuProps
  extends Omit<MenuItemProps, 'children' | 'rightGlyph' | 'variant'> {
  /**
   * Determines if `<SubMenu />` item appears open
   */
  open?: boolean;

  /**
   * Function to set the value of `open` in `<SubMenu />`
   */
  setOpen?: Dispatch<SetStateAction<boolean>>;

  /**
   * Whether the submenu should initially be open.
   *
   * (will be overridden by either `open` or `active`)
   */
  initialOpen?: boolean;

  /**
   * Main text rendered in `SubMenu`.
   */
  // TODO: Should this be a `ReactNode`?
  title?: string;

  /**
   * Content rendered inside of `SubMenu`.
   * @type `<MenuItem />` | `<SubMenu />` | `<MenuGroup />` | `<MenuSeparator />`
   */
  children?: React.ReactNode;

  /**
   * Callback fired when the Submenu opens
   */
  onEntered?: ExitHandler<HTMLUListElement>;

  /**
   * Callback fired when the Submenu closes
   */
  onExited?: ExitHandler<HTMLUListElement>;
}

// External only
export type SubMenuProps = InferredPolymorphicProps<
  PolymorphicAs,
  InternalSubMenuProps
>;
