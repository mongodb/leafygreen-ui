import { css } from '@leafygreen-ui/emotion';
import {
  leftGlyphClassName,
  titleClassName,
} from '@leafygreen-ui/input-option';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, Property, spacing } from '@leafygreen-ui/tokens';

import { Size } from '../types';

import { Variant } from './MenuItem.types';

export const menuItemContainerStyles = css`
  width: 100%;
  padding: 0;
  list-style: none;
`;

/** Define colors for the active elements */
const activeColors = {
  [Theme.Light]: {
    [Property.Background]: palette.green.light3,
    [Property.Text]: palette.green.dark2,
    [Property.Icon]: palette.green.dark1,
    [Property.Border]: palette.green.dark1,
  },
  [Theme.Dark]: {
    [Property.Background]: palette.green.dark3,
    [Property.Text]: palette.green.base,
    [Property.Icon]: palette.green.base,
    [Property.Border]: palette.green.base,
  },
} as const satisfies Record<Theme, Record<Property, string>>;

interface MenuItemStyleArgs {
  theme: Theme;
  size: Size;
  variant: Variant;
  active: boolean;
}

export const getMenuItemStyles = ({
  theme,
  size,
  active,
  variant,
}: MenuItemStyleArgs) => css`
  width: 100%;
  min-height: ${spacing[800]}px;

  ${size === Size.Large &&
  css`
    min-height: ${spacing[1200]}px;
    // TODO: align on \`large\` size text styles
  `}

  ${active &&
  css`
    &,
    &:hover {
      background-color: ${activeColors[theme].background};

      &:before {
        transform: scaleY(1) translateY(-50%);
        background-color: ${activeColors[theme].border};
      }

      .${titleClassName} {
        color: ${activeColors[theme].text};
        font-weight: bold;
      }

      .${leftGlyphClassName} {
        color: ${activeColors[theme].icon};
      }
    }
  `}

  ${variant === Variant.Destructive &&
  css`
    .${titleClassName} {
      color: ${color[theme].text.error.default};
    }
    .${leftGlyphClassName} {
      color: ${color[theme].icon.error.default};
    }

    &:hover {
      background-color: ${color[theme].background.error.hover};
      .${titleClassName} {
        color: ${color[theme].text.error.hover};
      }
      .${leftGlyphClassName} {
        color: ${color[theme].icon.error.hover};
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
