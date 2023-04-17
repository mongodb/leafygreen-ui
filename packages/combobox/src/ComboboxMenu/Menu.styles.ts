import { transparentize } from 'polished';

import { css, keyframes } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, spacing } from '@leafygreen-ui/tokens';

import { fontSize, lineHeight } from '../Chip/Chip.styles';
import { ComboboxSize as Size } from '../Combobox.types';

export const menuItemPadding: Record<Size, { x: number; y: number }> = {
  [Size.XSmall]: { x: 12, y: 8 },
  [Size.Small]: { x: 12, y: 8 },
  [Size.Default]: { x: 12, y: 8 },
  [Size.Large]: { x: 12, y: 8 },
};

/** Util that returns the height of a menu item (in px) */
export const getMenuItemHeight = (size: Size) => {
  return lineHeight[size] + 2 * menuItemPadding[size].y;
};

/**
 * Menu styles
 */

export const popoverStyle = (width = 384) => css`
  width: ${width}px;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid;
`;

export const popoverThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    box-shadow: 0px 4px 7px ${transparentize(0.85, palette.black)};
    border-color: ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    box-shadow: 0px 4px 7px ${transparentize(0.85, palette.black)};
    border-color: ${palette.gray.dark3};
  `,
};

export const menuBaseStyle = css`
  position: relative;
  width: 100%;
  margin: 0;
  padding: ${spacing[2]}px 0;
  font-family: ${fontFamilies.default};
  border-radius: inherit;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const menuThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
    background-color: ${palette.gray.dark3};
  `,
};

export const menuList = css`
  position: relative;
  margin: 0;
  padding: 0;
`;

export const menuMessageBaseStyle = css`
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  gap: 8px;
`;

export const menuMessageThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark3};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light3};
  `,
};

export const menuMessageSizeStyle = (size: Size) => css`
  font-size: ${fontSize[size]}px;
  line-height: ${lineHeight[size]}px;
  padding: ${menuItemPadding[size].y}px ${menuItemPadding[size].x}px;
`;

const loadingIconAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const loadingIconStyle = css`
  animation: ${loadingIconAnimation} 1.5s linear infinite;
`;
