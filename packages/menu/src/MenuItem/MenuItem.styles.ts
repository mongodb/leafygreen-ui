import { css, cx } from '@leafygreen-ui/emotion';
import {
  leftGlyphClassName,
  titleClassName,
} from '@leafygreen-ui/input-option';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { color, spacing } from '@leafygreen-ui/tokens';

import { LGIDs } from '../constants';
import { menuColor } from '../styles';

import { Variant } from './MenuItem.types';

export const menuItemClassName = createUniqueClassName(LGIDs.item);

export const menuItemContainerStyles = css`
  width: 100%;
  padding: 0;
  list-style: none;
`;

interface MenuItemStyleArgs {
  active: boolean;
  disabled: boolean;
  highlighted: boolean;
  theme: Theme;
  variant: Variant;
}

export const getMenuItemStyles = ({
  active,
  disabled,
  highlighted,
  theme,
  variant,
}: MenuItemStyleArgs) =>
  cx(
    // Base styles
    css`
      display: block;
      width: 100%;
      min-height: ${spacing[800]}px;
      background-color: ${menuColor[theme].background.default};

      .${titleClassName} {
        color: ${menuColor[theme].text.default};
      }
      .${leftGlyphClassName} {
        color: ${menuColor[theme].icon.default};
      }
    `,
    {
      // Highlighted
      [css`
        background-color: ${menuColor[theme].background.focus};
        .${titleClassName} {
          color: ${menuColor[theme].text.focus};
        }
        .${leftGlyphClassName} {
          color: ${menuColor[theme].icon.focus};
        }
      `]: highlighted,

      // Active
      [css`
        &,
        &:hover {
          background-color: ${menuColor[theme].background.active};

          &:before {
            transform: scaleY(1) translateY(-50%);
            background-color: ${menuColor[theme].border.active};
          }

          .${titleClassName} {
            color: ${menuColor[theme].text.active};
            font-weight: bold;
          }

          .${leftGlyphClassName} {
            color: ${menuColor[theme].icon.active};
          }
        }
      `]: active,

      // Destructive
      [css`
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
      `]: variant === Variant.Destructive,

      // Disabled
      [css`
        &,
        &:hover {
          background-color: ${menuColor[theme].background.default};
          .${titleClassName} {
            color: ${color[theme].text.disabled.default};
          }
          .${leftGlyphClassName} {
            color: ${color[theme].icon.disabled.default};
          }
        }
      `]: disabled,
    },
  );

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

export const getDarkInLightModeMenuStyles = () => {
  return css``;
};
