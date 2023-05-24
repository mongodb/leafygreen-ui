import { MouseEventHandler, ReactElement, ReactFragment } from 'react';

import {
  type ButtonProps as ImportedButtonProps,
  Variant as ButtonVariants,
} from '@leafygreen-ui/button';
import { DarkModeProps } from '@leafygreen-ui/lib';
import {
  MenuItemProps,
  type MenuProps as ImportedMenuProps,
} from '@leafygreen-ui/menu';
import {
  InferredPolymorphicProps,
  PolymorphicAs,
} from '@leafygreen-ui/polymorphic';
import {
  Align as ImportedAlign,
  Justify as ImportedJustify,
} from '@leafygreen-ui/popover';

export type MenuItemType = ReactElement<
  InferredPolymorphicProps<PolymorphicAs, MenuItemProps>
>;

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

export type MenuItemsType = ReactFragment & {
  props: {
    children: Array<MenuItemType>;
  };
};

export const Align = {
  Top: ImportedAlign.Top,
  Bottom: ImportedAlign.Bottom,
} as const;

export type Align = typeof Align[keyof typeof Align];

export const Justify = {
  Start: ImportedJustify.Start,
  End: ImportedJustify.End,
} as const;

export type Justify = typeof Justify[keyof typeof Justify];

export type SelectedMenuProps = Omit<
  ImportedMenuProps,
  | 'children'
  | 'trigger'
  | 'shouldClose'
  | 'darkMode'
  | 'onClick'
  | 'align'
  | 'justify'
  | 'className'
  | 'refEl'
>;

export interface MenuProps extends SelectedMenuProps {
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
   * The menu items to appear in the menu dropdown. Must be `<MenuItem />`.
   *
   * ```js
   * <>
   *  <MenuItem onClick={()=>{}}> Menu Item</MenuItem>
   *  <MenuItem description="I am a description" disabled>Disabled Menu Item</MenuItem>
   *  <MenuItem description="I am also a description">
   *    Menu Item With Description
   *  </MenuItem>
   * </>
   * ```
   */
  menuItems: MenuItemsType;

  /**
   * Callback fired when the trigger is clicked
   */
  onTriggerClick?: MouseEventHandler;

  /**
   * aria-label for the menu trigger button
   */
  triggerAriaLabel?: string;
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
