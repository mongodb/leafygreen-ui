import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration, typeScales } from '@leafygreen-ui/tokens';

import { ComboboxSize } from '../Combobox.types';

/**
 * The line-height of the combobox.
 */
export const lineHeight: Record<ComboboxSize, number> = {
  [ComboboxSize.XSmall]: 16,
  [ComboboxSize.Small]: typeScales.body1.lineHeight,
  [ComboboxSize.Default]: typeScales.body1.lineHeight,
  [ComboboxSize.Large]: typeScales.body2.lineHeight,
};

/**
 * The font-size of the combobox.
 */
export const fontSize: Record<ComboboxSize, number> = {
  [ComboboxSize.XSmall]: typeScales.body1.fontSize,
  [ComboboxSize.Small]: typeScales.body1.fontSize,
  [ComboboxSize.Default]: typeScales.body1.fontSize,
  [ComboboxSize.Large]: typeScales.body2.fontSize,
};

/**
 * Vertical padding on a chip (in px)
 */
export const chipWrapperPaddingY = {
  [ComboboxSize.XSmall]: 1,
  [ComboboxSize.Small]: 0,
  [ComboboxSize.Default]: 2,
  [ComboboxSize.Large]: 4,
} as const;

/**
 * Util to get the chip height
 * `lineHeight + (2 * paddingY)`
 */
export const getChipHeight = (size: ComboboxSize) => {
  return lineHeight[size] + 2 * chipWrapperPaddingY[size];
};

export const chipWrapperBaseStyle = css`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  border-radius: 4px;
`;

export const chipWrapperSizeStyle = (size: ComboboxSize) => css`
  font-size: ${fontSize[size]}px;
  line-height: ${lineHeight[size]}px;
`;

export const chipWrapperThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background-color: ${palette.gray.light2};

    // TODO: - refine these styles with Design
    &:focus-within {
      background-color: ${palette.blue.light2};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
    background-color: ${palette.gray.dark2};

    &:focus-within {
      background-color: ${palette.blue.dark2};
    }
  `,
};

export const disabledBaseChipWrapperStyles = css`
  cursor: not-allowed;
  pointer-events: none;
`;

export const disabledChipWrapperStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
    background-color: ${palette.gray.light3};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark4};
    box-shadow: inset 0 0 1px 1px ${palette.gray.dark2};
  `,
};

export const chipTextSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    padding-inline-start: 6px;
    padding-inline-end: 2px;
    padding-block: ${chipWrapperPaddingY[ComboboxSize.XSmall]}px;
  `,
  [ComboboxSize.Small]: css`
    padding-inline-start: 6px;
    padding-inline-end: 2px;
    padding-block: ${chipWrapperPaddingY[ComboboxSize.Small]}px;
  `,
  [ComboboxSize.Default]: css`
    padding-inline-start: 6px;
    padding-inline-end: 2px;
    padding-block: ${chipWrapperPaddingY[ComboboxSize.Default]}px;
  `,
  [ComboboxSize.Large]: css`
    padding-inline: 10px;
    padding-block: ${chipWrapperPaddingY[ComboboxSize.Large]}px;
  `,
};

export const chipButtonStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color ${transitionDuration.faster}ms ease-in-out;
  padding: 0 2px;
`;

export const chipButtonSizeStyle = (size: ComboboxSize) => css`
  height: ${getChipHeight(size)}px;
`;

export const chipButtonThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark2};

    &:hover {
      color: ${palette.black};
      background-color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};

    &:hover {
      color: ${palette.gray.light3};
      background-color: ${palette.gray.dark1};
    }
  `,
};

export const chipButtonBaseDisabledStyles = css`
  cursor: not-allowed;
  &:hover {
    color: inherit;
    background-color: unset;
  }
`;

export const chipButtonDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
  `,
};
