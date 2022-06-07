import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies, typeScales, Mode } from '@leafygreen-ui/tokens';
import { ComboboxSize } from './Combobox.types';
import { menuItemHeight, menuItemPadding } from './constants';

/**
 * Menu styles
 */

export const popoverStyle = (width = 384) => css`
  border-radius: 4px;
  width: ${width}px;

  & > * {
    border-radius: inherit;
  }
`;

export const menuBaseStyle = css`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: ${fontFamilies.default};
  border-radius: inherit;
  overflow: auto;
  scroll-behavior: smooth;
  min-height: ${menuItemHeight}px;
`;

export const menuModeStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark3};
    background-color: ${uiColors.white};
    box-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);
  `,
  [Mode.Dark]: css``, // TODO: DarkMode
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
  & > svg {
    width: 1em;
    height: 1em;
  }
`;

export const menuMessageModeStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    ${uiColors.gray.dark1}
  `,
  [Mode.Dark]: css``, // TODO: DarkMode
};

export const menuMessageSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    font-size: ${typeScales.body1.fontSize +
    1}px; // TODO: update this @ redesign
    line-height: ${typeScales.body1.lineHeight +
    1}px; // TODO: update this @ redesign
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
