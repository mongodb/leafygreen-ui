import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, spacing, typeScales } from '@leafygreen-ui/tokens';

import { ComboboxSize } from '../Combobox.types';
import { menuItemHeight, menuItemPadding } from '../ComboboxMenu/Menu.styles';

/**
 * Styles
 */

export const comboboxOptionBaseStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  color: inherit;
  cursor: pointer;
  overflow: hidden;
  font-family: ${fontFamilies.default};

  // Left wedge
  &:before {
    content: '';
    position: absolute;
    left: 0;
    width: 4px;
    height: calc(100% - 14px);
    background-color: rgba(255, 255, 255, 0);
    border-radius: 0 6px 6px 0;
    transform: scale3d(0, 0.3, 0);
    transition: 200ms ease-in-out;
    transition-property: transform, background-color;
  }
`;

export const comboboxOptionThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:hover {
      outline: none;
      background-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    &:hover {
      outline: none;
      background-color: ${palette.gray.dark4};
    }
  `,
};

export const comboboxOptionSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-height: ${menuItemHeight[ComboboxSize.Default]}px;
    padding: ${menuItemPadding[ComboboxSize.Default].y}px
      ${menuItemPadding[ComboboxSize.Default].x}px;
    gap: ${spacing[1]}px;

    &:before {
      max-height: ${menuItemHeight[ComboboxSize.Default]}px;
    }
  `,
  [ComboboxSize.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    min-height: ${menuItemHeight[ComboboxSize.Large]}px;
    padding: ${menuItemPadding[ComboboxSize.Large].y}px
      ${menuItemPadding[ComboboxSize.Large].x}px;
    gap: ${spacing[2]}px;

    &:before {
      max-height: ${menuItemHeight[ComboboxSize.Large]}px;
    }
  `,
};

const _comboboxOptionBaseActiveStyle = css`
  outline: none;

  &:before {
    transform: scaleY(1);
  }
`;

export const comboboxOptionActiveStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    ${_comboboxOptionBaseActiveStyle};
    background-color: ${palette.blue.light3};

    &:before {
      background-color: ${palette.blue.base};
    }
  `,
  [Theme.Dark]: css`
    ${_comboboxOptionBaseActiveStyle};
    background-color: ${palette.blue.dark3};

    &:before {
      background-color: ${palette.blue.light1};
    }
  `,
};

const _comboboxOptionBaseDisabledStyle = css`
  cursor: not-allowed;

  &:hover {
    background-color: inherit;
  }

  &:before {
    content: unset;
  }
`;

export const comboboxOptionDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    ${_comboboxOptionBaseDisabledStyle};
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    ${_comboboxOptionBaseDisabledStyle};
    color: ${palette.gray.dark1};
  `,
};

export const checkIconStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    min-width: ${spacing[3]}px;
  `,
  [ComboboxSize.Large]: css`
    min-width: ${spacing[4]}px;
  `,
};

export const flexSpan = css`
  display: inline-flex;
  gap: 8px;
  justify-content: start;
  align-items: inherit;
  overflow-wrap: anywhere;
`;

export const disallowPointer = css`
  pointer-events: none;
`;

export const displayNameStyle = (isSelected: boolean) => css`
  font-weight: ${isSelected ? 'bold' : 'normal'};
`;
