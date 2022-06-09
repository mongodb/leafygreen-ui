import { css, keyframes } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';
import { ComboboxSize, Theme } from '../Combobox.types';

export const menuItemPadding: Record<ComboboxSize, { x: number; y: number }> = {
  [ComboboxSize.Default]: { x: 12, y: 8 },
  [ComboboxSize.Large]: { x: 12, y: 8 },
};

/** Height of a menu item (in px) */
export const menuItemHeight = {
  [ComboboxSize.Default]:
    typeScales.body1.lineHeight + 2 * menuItemPadding[ComboboxSize.Default].y,
  [ComboboxSize.Large]:
    typeScales.body2.lineHeight + 2 * menuItemPadding[ComboboxSize.Large].y,
};

/**
 * Menu styles
 */

export const popoverStyle = (width = 384) => css`
  border-radius: 4px;
  width: ${width}px;
  overflow: hidden;
`;

export const popoverThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    box-shadow: 0px 4px 7px ${transparentize(0.85, palette.black)};
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

export const menuBaseStyle = css`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
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
  [Theme.Dark]: css``, // TODO: DarkMode
};

export const menuSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    min-height: ${menuItemHeight[ComboboxSize.Default]}px;
  `,
  [ComboboxSize.Large]: css`
    min-height: ${menuItemHeight[ComboboxSize.Large]}px;
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
  [Theme.Dark]: css``, // TODO: DarkMode
};

export const menuMessageSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    padding: ${menuItemPadding[ComboboxSize.Default].y}px
      ${menuItemPadding[ComboboxSize.Default].x}px;
  `,
  [ComboboxSize.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    padding: ${menuItemPadding[ComboboxSize.Large].y}px
      ${menuItemPadding[ComboboxSize.Large].x}px;
  `,
};

export const menuMessageIconSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    height: ${typeScales.body1.fontSize}px;
    width: ${typeScales.body1.fontSize}px;
  `,
  [ComboboxSize.Large]: css`
    height: ${typeScales.body2.fontSize}px;
    width: ${typeScales.body2.fontSize}px;
  `,
};

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
