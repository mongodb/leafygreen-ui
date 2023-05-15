import { ReactElement, ReactFragment } from 'react';

import {
  type ButtonProps,
  Variant as ButtonVariants,
} from '@leafygreen-ui/button';
import { DarkModeProps } from '@leafygreen-ui/lib';
import { type MenuProps } from '@leafygreen-ui/menu';

type OmittedButtonProps = Omit<ButtonProps, 'rightGlyph' | 'href' | 'as'>;
type Variant = Extract<ButtonVariants, 'default' | 'primary' | 'danger'>;
type Align = Extract<MenuProps['align'], 'top' | 'bottom'>;
type Justify = Extract<MenuProps['justify'], 'start' | 'end'>;

type MenuItemsType = ReactFragment & {
  props: {
    // Define the props for the element
    children: Array<ReactElement>;
  };
};

export interface SplitButtonProps extends DarkModeProps, OmittedButtonProps {
  variant?: Variant;

  label: string;

  align?: Align;

  justify?: Justify;

  menuItems: MenuItemsType;
}
