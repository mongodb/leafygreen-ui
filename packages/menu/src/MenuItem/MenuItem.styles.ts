import { css } from '@leafygreen-ui/emotion';
import {
  leftGlyphClassName,
  titleClassName,
} from '@leafygreen-ui/input-option';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing, Type as ElementType } from '@leafygreen-ui/tokens';

import { menuBackgroundColors } from '../Menu/Menu.styles';
import { getBaseTheme } from '../Menu/utils/useMenuTheme';
import { MenuTheme, Size } from '../types';

import { Variant } from './MenuItem.types';

export const menuItemContainerStyles = css`
  width: 100%;
  padding: 0;
  list-style: none;
`;

/** Define colors for the active elements */
const activeColors = {
  [Theme.Light]: {
    [ElementType.Background]: palette.green.light3,
    [ElementType.Text]: palette.green.dark2,
    [ElementType.Icon]: palette.green.dark1,
    [ElementType.Border]: palette.green.dark1,
  },
  [Theme.Dark]: {
    [ElementType.Background]: palette.green.dark3,
    [ElementType.Text]: palette.green.base,
    [ElementType.Icon]: palette.green.base,
    [ElementType.Border]: palette.green.base,
  },
} as const satisfies Record<Theme, Record<ElementType, string>>;

interface MenuItemStyleArgs {
  theme: MenuTheme;
  size: Size;
  variant: Variant;
  active: boolean;
  highlighted: boolean;
}

export const getMenuItemStyles = ({
  theme,
  size,
  active,
  variant,
  highlighted,
}: MenuItemStyleArgs) => css`
  width: 100%;
  min-height: ${size === Size.Large ? spacing[1200] : spacing[800]}px;
  padding-block: ${spacing[50]}px;

  // Override the default input option colors
  ${!highlighted &&
  css`
    background-color: ${menuBackgroundColors[theme]};
  `}

  ${active &&
  css`
    &,
    &:hover {
      background-color: ${activeColors[getBaseTheme(theme)].background};

      &:before {
        transform: scaleY(1) translateY(-50%);
        background-color: ${activeColors[getBaseTheme(theme)].border};
      }

      .${titleClassName} {
        color: ${activeColors[getBaseTheme(theme)].text};
        font-weight: bold;
      }
      .${leftGlyphClassName} {
        color: ${activeColors[getBaseTheme(theme)].icon};
      }
    }
  `}

  ${variant === Variant.Destructive &&
  css`
    .${titleClassName} {
      color: ${color[getBaseTheme(theme)].text.error.default};
    }
    .${leftGlyphClassName} {
      color: ${color[getBaseTheme(theme)].icon.error.default};
    }

    &:hover {
      background-color: ${color[getBaseTheme(theme)].background.error.hover};
      .${titleClassName} {
        color: ${color[getBaseTheme(theme)].text.error.hover};
      }
      .${leftGlyphClassName} {
        color: ${color[getBaseTheme(theme)].icon.error.hover};
      }
    }
  `}
`;

export const getMenuItemContentStyles = ({
  hasGlyph,
}: {
  hasGlyph: boolean;
}) => css`
  ${!hasGlyph &&
  css`
    padding-inline-start: ${spacing[300]}px;
  `}
`;

export const disabledIconStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark2};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};
