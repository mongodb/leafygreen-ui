import { ComponentType, ReactFragment } from 'react';

import {
  type ButtonProps,
  Variant as ButtonVariants,
} from '@leafygreen-ui/button';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { MenuItemProps } from '@leafygreen-ui/menu';
import { type MenuProps } from '@leafygreen-ui/menu';

export const Variant = {
  Default: ButtonVariants.Default,
  Primary: ButtonVariants.Primary,
  Danger: ButtonVariants.Danger,
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

type OmittedButtonProps = Omit<ButtonProps, 'rightGlyph' | 'href' | 'as'>;
export type Align = Extract<MenuProps['align'], 'top' | 'bottom'>;
export type Justify = Extract<MenuProps['justify'], 'start' | 'end'>;

type MenuItemsType = ReactFragment & {
  props: {
    children: Array<ComponentType<MenuItemProps>>;
  };
};

export interface SplitButtonProps extends DarkModeProps, OmittedButtonProps {
  variant?: Variant;

  label: string;

  align?: Align;

  justify?: Justify;

  menuItems: MenuItemsType;
}

// TODO: popover props
