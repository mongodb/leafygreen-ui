import { MouseEventHandler, ReactElement } from 'react';

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

export type MenuItemsType = Array<MenuItemType>;

export const Variant = {
  Default: ButtonVariants.Default,
  Primary: ButtonVariants.Primary,
  Danger: ButtonVariants.Danger,
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

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

// TODO: remove `href` and `as` when Button is updated to use `InferredPolymorphic`
// https://jira.mongodb.org/browse/LG-3260
type ButtonProps = Omit<
  ImportedButtonProps,
  'rightGlyph' | 'href' | 'as' | 'variant'
>;

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
  | 'spacing'
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
   * The menu items to appear in the menu dropdown. Must be an array of `<MenuItem />`.
   *
   * ```js
   * [
   *   <MenuItem key='0' onClick={()=>{}}> Menu Item</MenuItem>,
   *   <MenuItem key='1' description="I am a description" disabled>Disabled Menu Item</MenuItem>,
   *   <MenuItem key='2' description="I am also a description">,
   *     Menu Item With Description
   *   </MenuItem>
   * ]
   * ```
   *
   * @type Array<MenuItem>
   */
  menuItems: MenuItemsType;

  /**
   * Callback fired when the trigger is clicked.
   */
  onTriggerClick?: MouseEventHandler;

  /**
   * aria-label for the menu trigger button.
   */
  triggerAriaLabel?: string;

  /**
   * Callback fired when a menuItem is clicked.
   */
  onChange?: MouseEventHandler;
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
