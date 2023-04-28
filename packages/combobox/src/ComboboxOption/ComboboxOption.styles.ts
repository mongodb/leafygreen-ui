import { css } from '@leafygreen-ui/emotion';
import { leftGlyphClassName } from '@leafygreen-ui/input-option';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights, spacing } from '@leafygreen-ui/tokens';

import { fontSize, lineHeight } from '../Chip/Chip.styles';
import { ComboboxSize } from '../Combobox.types';
import {
  getMenuItemHeight,
  menuItemPadding,
} from '../ComboboxMenu/Menu.styles';

/**
 * Styles
 */

export const comboboxOptionSizeStyle = (size: ComboboxSize) => css`
  font-size: ${fontSize[size]}px;
  line-height: ${lineHeight[size]}px;
  min-height: ${getMenuItemHeight(size)}px;
  padding: ${menuItemPadding[size].y}px ${menuItemPadding[size].x}px;
  gap: ${spacing[1]}px;

  &:before {
    max-height: ${getMenuItemHeight(size)}px;
  }
`;

export const checkMarkSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    min-width: ${spacing[3]}px;
  `,
  [ComboboxSize.Small]: css`
    min-width: ${spacing[3]}px;
  `,
  [ComboboxSize.Default]: css`
    min-width: ${spacing[3]}px;
  `,
  [ComboboxSize.Large]: css`
    min-width: ${spacing[4]}px;
  `,
};

export const checkBoxBaseStyles = css`
  pointer-events: none;
  gap: 0;

  label {
    gap: 0;
    align-items: center;
  }
`;

export const disallowPointer = css`
  pointer-events: none;
`;

export const displayNameStyle = (isSelected: boolean) => css`
  font-weight: ${isSelected ? fontWeights.bold : fontWeights.regular};
`;

export const iconThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};

export const iconHighlightedStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light3};
  `,
};

export const iconDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

export const checkMarkThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light1};
  `,
};

export const checkMarkDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

export const multiselectIconPosition = css`
  .${leftGlyphClassName} {
    align-self: baseline;
  }
`;
export const multiselectIconLargePosition = css`
  .${leftGlyphClassName} {
    height: 28px;
  }
`;
