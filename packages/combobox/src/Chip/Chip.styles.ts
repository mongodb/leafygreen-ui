import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration, typeScales } from '@leafygreen-ui/tokens';

import { ComboboxSize } from '../Combobox.types';

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
 * Height of the chip element (in px)
 * lineHeight + (2 * paddingY)
 */
export const chipHeight: Record<ComboboxSize, number> = {
  [ComboboxSize.XSmall]: 16 + 2 * chipWrapperPaddingY[ComboboxSize.XSmall], // 16 + (2 * 1) = 18
  [ComboboxSize.Small]:
    typeScales.body1.lineHeight + 2 * chipWrapperPaddingY[ComboboxSize.Small], // 20 + (2 * 0) = 20
  [ComboboxSize.Default]:
    typeScales.body1.lineHeight + 2 * chipWrapperPaddingY[ComboboxSize.Default], // 20 + (2 * 2) = 24
  [ComboboxSize.Large]:
    typeScales.body2.lineHeight + 2 * chipWrapperPaddingY[ComboboxSize.Large], // 28 + (2 * 4) = 36
};

export const chipWrapperBaseStyle = css`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
`;

export const chipWrapperSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: 16px;
    border-radius: 4px;
  `,
  [ComboboxSize.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    border-radius: 4px;
  `,
  [ComboboxSize.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    border-radius: 4px;
  `,
  [ComboboxSize.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    border-radius: 4px;
  `,
};

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

export const disabledChipWrapperStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    color: ${palette.gray.base};
    background-color: ${palette.gray.light3};
  `,
  [Theme.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark4};
    box-shadow: inset 0 0 1px 1px ${palette.gray.dark2}; ;
  `,
};

export const chipTextSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    padding-inline: 6px;
    padding-block: ${chipWrapperPaddingY[ComboboxSize.XSmall]}px;
  `,
  [ComboboxSize.Small]: css`
    padding-inline: 6px;
    padding-block: ${chipWrapperPaddingY[ComboboxSize.Small]}px;
  `,
  [ComboboxSize.Default]: css`
    padding-inline: 6px;
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
`;

export const chipButtonSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    height: ${chipHeight[ComboboxSize.XSmall]}px;
  `,
  [ComboboxSize.Small]: css`
    height: ${chipHeight[ComboboxSize.Small]}px;
  `,
  [ComboboxSize.Default]: css`
    height: ${chipHeight[ComboboxSize.Default]}px;
  `,
  [ComboboxSize.Large]: css`
    height: ${chipHeight[ComboboxSize.Large]}px;
  `,
};

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

export const chipButtonDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark2};
    &:hover {
      color: inherit;
      background-color: unset;
    }
  `,
  [Theme.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark2};
    &:hover {
      color: inherit;
      background-color: unset;
    }
  `,
};
