import { ComponentType, ReactFragment } from 'react';

import {
  type ButtonProps as ImportedButtonProps,
  Variant as ButtonVariants,
} from '@leafygreen-ui/button';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { MenuItemProps } from '@leafygreen-ui/menu';
import { type MenuProps as ImportedMenuProps } from '@leafygreen-ui/menu';

export const Variant = {
  Default: ButtonVariants.Default,
  Primary: ButtonVariants.Primary,
  Danger: ButtonVariants.Danger,
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

type ButtonProps = Omit<
  ImportedButtonProps,
  'rightGlyph' | 'href' | 'as' | 'variant'
>;

type MenuItemsType = ReactFragment & {
  props: {
    children: Array<ComponentType<MenuItemProps>>;
  };
};

export type Align = Extract<ImportedMenuProps['align'], 'top' | 'bottom'>;
export type Justify = Extract<ImportedMenuProps['justify'], 'start' | 'end'>;

export type OmittedMenuProps = Omit<
  ImportedMenuProps,
  | 'children'
  | 'trigger'
  | 'open'
  | 'setOpen'
  | 'shouldClose'
  | 'darkMode'
  | 'onClick'
  | 'align'
  | 'justify'
  | 'className'
>;

export interface MenuProps extends OmittedMenuProps {
  /**
   * Determines the alignment of the menu relative to the component wrapper.
   *
   * @default 'bottom'
   */
  align?: Align;

  /**
   * Determines the justification of the menu relative to the component wrapper.
   *
   *  @default 'end'
   */
  justify?: Justify;

  /**
   * The menu items to be rendered in the menu dropdown. Must be `<MenuItem />`.
   *
   * ```js
   * <>
   *  <MenuItem onClick={()=>{}}> Menu Item</MenuItem>
   *  <MenuItem description="I am a description">Disabled Menu Item</MenuItem>
   *  <MenuItem description="I am also a description">
   *    Menu Item With Description
   *  </MenuItem>
   * </>
   * ```
   */
  menuItems: MenuItemsType;
}

export interface SplitButtonProps
  extends DarkModeProps,
    ButtonProps,
    MenuProps {
  /**
   * Sets the variant for both Buttons.
   *
   * @default 'default'
   */
  variant?: Variant;

  /**
   * The text that will appear inside of the primary button.
   */
  label: string;
}
