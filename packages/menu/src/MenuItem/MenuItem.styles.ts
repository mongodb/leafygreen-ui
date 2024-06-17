import { css, cx } from '@leafygreen-ui/emotion';
import {
  descriptionClassName,
  leftGlyphClassName,
  titleClassName,
} from '@leafygreen-ui/input-option';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
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

// TODO: Remove dark-in-light mode styles
// after https://jira.mongodb.org/browse/LG-3974
export const getDarkInLightModeMenuItemStyles = ({
  active,
  disabled,
  highlighted,
}: MenuItemStyleArgs) => {
  return cx(
    css`
      background-color: ${color.dark.background.primary.default};

      .${titleClassName} {
        color: ${color.dark.text.primary.default};
      }
      .${descriptionClassName} {
        color: ${color.dark.text.secondary.default};
      }
      .${leftGlyphClassName} {
        color: ${color.dark.icon.primary.default};
      }

      &:hover {
        background-color: ${color.dark.background.primary.hover};

        .${titleClassName} {
          color: ${color.dark.text.primary.hover};
        }
        .${descriptionClassName} {
          color: ${color.dark.text.secondary.hover};
        }
        .${leftGlyphClassName} {
          color: ${color.dark.icon.primary.hover};
        }
      }
    `,
    {
      // Active styles
      [css`
        &,
        &:hover {
          background-color: ${color.dark.background.primary.default};

          .${titleClassName} {
            color: ${palette.green.base};
          }
          .${leftGlyphClassName} {
            color: ${palette.green.base};
          }

          &::before {
            background-color: ${palette.green.base};
          }
        }
      `]: active,
      // Highlighted
      [css`
        background-color: ${color.dark.background.primary.focus};

        .${titleClassName} {
          color: ${color.dark.text.primary.focus};
        }
        .${descriptionClassName} {
          color: ${color.dark.text.secondary.focus};
        }
        .${leftGlyphClassName} {
          color: ${color.dark.icon.primary.focus};
        }
      `]: highlighted,

      // Disabled
      [css`
        &,
        &:hover {
          background-color: ${color.dark.background.primary.default};

          .${titleClassName} {
            color: ${color.dark.text.disabled.default};
          }
          .${descriptionClassName} {
            color: ${color.dark.text.disabled.default};
          }
          .${leftGlyphClassName} {
            color: ${color.dark.icon.disabled.default};
          }
        }
      `]: disabled,
    },
  );
};
