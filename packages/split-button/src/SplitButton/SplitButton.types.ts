import { MouseEventHandler } from 'react';

import {
  type ButtonProps as ImportedButtonProps,
  Variant as ButtonVariants,
} from '@leafygreen-ui/button';
import { DarkModeProps } from '@leafygreen-ui/lib';
import {
  type MenuProps as ImportedMenuProps,
} from '@leafygreen-ui/menu';
import {
  Align as ImportedAlign,
  Justify as ImportedJustify,
} from '@leafygreen-ui/popover';
import type { ItemClickHandler } from '../Menu/Menu.types';

export const Variant = {
  Default: ButtonVariants.Default,
  Primary: ButtonVariants.Primary,
  Danger: ButtonVariants.Danger,
} as const;

export type Variant = (typeof Variant)[keyof typeof Variant];

export const Align = {
  Top: ImportedAlign.Top,
  Bottom: ImportedAlign.Bottom,
} as const;

export type Align = (typeof Align)[keyof typeof Align];

export const Justify = {
  Start: ImportedJustify.Start,
  End: ImportedJustify.End,
} as const;

export type Justify = (typeof Justify)[keyof typeof Justify];

// TODO: remove `href` and `as` when Button is updated to use `InferredPolymorphic`
// https://jira.mongodb.org/browse/LG-3260
type ButtonProps = Omit<
  ImportedButtonProps,
  'children' | 'rightGlyph' | 'href' | 'as' | 'variant'
>;

export type SelectedMenuProps = Pick<
  ImportedMenuProps,
  | 'children'
  | 'darkMode'
  | 'maxHeight'
  | 'adjustOnMutation'
  | 'popoverZIndex'
  | 'renderMode'
  | 'portalClassName'
  | 'portalContainer'
  | 'portalRef'
  | 'scrollContainer'
  | 'align'
  | 'justify'
  | 'id'
  | 'open'
  | 'setOpen'
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
   * Callback fired when the trigger is clicked.
   */
  onTriggerClick?: MouseEventHandler;

  /**
   * Callback called when an item is clicked, with the click event and an options object.
   * Provide an implementation to avoid the default behavior of the menu closing when an item is clicked.
   */
  onItemClick?: ItemClickHandler;

  /**
   * aria-label for the menu trigger button.
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
