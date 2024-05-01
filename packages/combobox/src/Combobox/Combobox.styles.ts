import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  color,
  focusRing,
  fontFamilies,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import {
  chipClassName,
  chipWrapperPaddingY,
  fontSize,
  lineHeight,
} from '../ComboboxChip/ComboboxChip.styles';
import { ComboboxSize as Size, Overflow, State } from '../types';

/**
 * Util to get the chip height
 * `lineHeight + (2 * paddingY)`
 */
// Rename the variable defined in chip styles
const inputHeight = (size: Size) => {
  return lineHeight[size] + 2 * chipWrapperPaddingY[size];
};

// Gap between each chip
const flexGap = spacing[100];

/**
 * The min-height of the combobox.
 */
export const wrapperHeight: Record<Size, number> = {
  [Size.XSmall]: 22,
  [Size.Small]: 28,
  [Size.Default]: 36,
  [Size.Large]: 48,
};

/**
 * Util that calculates the Y padding.
 * `(wrapperHeight - inputHeight(- (borderTop + borderBottom)) / 2`
 */
const getYPadding = (size: Size) => {
  return (wrapperHeight[size] - inputHeight(size) - 2) / 2;
};

/**
 * Size of combobox x & y padding (in px)
 * (wrapperHeight - inputHeight(- (borderTop + borderBottom)) / 2
 */
export const comboboxPadding: Record<
  Size,
  {
    y: number;
    xLeftWithChip: number;
    xLeftWithoutChip: number;
    xRight: number;
  }
> = {
  [Size.XSmall]: {
    y: getYPadding(Size.XSmall),
    xLeftWithChip: spacing[25],
    xLeftWithoutChip: spacing[200],
    xRight: spacing[100],
  },
  [Size.Small]: {
    y: getYPadding(Size.Small),
    xLeftWithChip: spacing[100],
    xLeftWithoutChip: spacing[200],
    xRight: spacing[100],
  },
  [Size.Default]: {
    y: getYPadding(Size.Default),
    xLeftWithChip: spacing[150],
    xLeftWithoutChip: spacing[300],
    xRight: spacing[200],
  },
  [Size.Large]: {
    y: getYPadding(Size.Large),
    xLeftWithChip: spacing[300],
    xLeftWithoutChip: spacing[300],
    xRight: spacing[200],
  },
};

/** Width of the clear icon (in px) */
export const clearButtonIconSize = 28;

/** Width of the dropdown caret icon (in px) */
export const caretIconSize = spacing[400];

export const comboboxParentStyle = (size: Size): string => {
  return css`
    font-family: ${fontFamilies.default};
    width: 100%;
    min-width: ${fontSize[size] +
    2 * comboboxPadding[size].xLeftWithChip +
    caretIconSize +
    2}px;
  `;
};

export const baseComboboxStyles = css`
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;
  cursor: text;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: background-color, box-shadow, border-color;
  border: 1px solid;
  width: 100%;
  max-width: 100%;
  border-radius: 6px;
  position: relative;
  overflow: hidden;

  // Overflow shadow
  ::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 20px;
    bottom: -21px;
    left: 50%;
    translate: -50% 0%;
    border-radius: 20%;
    box-shadow: 0 0 0 0 rgb(255 255 255 / 0%);
    transition: ${transitionDuration.default}ms linear;
    transition-property: box-shadow;
  }
`;

export const comboboxThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${color.light.text.primary.default};
    background-color: ${color.light.background.primary.default};
  `,
  [Theme.Dark]: css`
    color: ${color.dark.text.primary.default};
    background-color: ${palette.gray.dark4};
  `,
};

export const comboboxSizeStyles = (
  size: Size,
  isMultiselectWithSelections: boolean,
) => css`
  padding-top: ${comboboxPadding[size].y}px;
  padding-bottom: ${comboboxPadding[size].y}px;
  padding-left: ${isMultiselectWithSelections
    ? `${comboboxPadding[size].xLeftWithChip}px`
    : `${comboboxPadding[size].xLeftWithoutChip}px`};
  padding-right: ${comboboxPadding[size].xRight}px;
`;

export const getComboboxDisabledStyles = (theme: Theme) => css`
  cursor: not-allowed;
  color: ${color[theme].text.disabled.default};
  background-color: ${color[theme].background.disabled.default};
  border-color: ${color[theme].border.disabled.default};
`;

export const getComboboxStateStyles = (theme: Theme) => ({
  [State.Error]: css`
    border-color: ${color[theme].border.error.default};
  `,
  [State.None]: css`
    border-color: ${color[theme].border.primary.default};
  `,
  [State.Valid]: css`
    border-color: ${color[theme].border.success.default};
  `,
});

export const comboboxFocusStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-within {
      border-color: transparent;
      box-shadow: ${focusRing[Theme.Light].input};
    }
  `,
  [Theme.Dark]: css`
    &:focus-within {
      border-color: transparent;
      box-shadow: ${focusRing[Theme.Dark].input};
    }
  `,
};

export const iconsWrapperBaseStyles = css`
  display: flex;
  align-items: center;
`;

export const iconsWrapperSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    gap: ${spacing[100]}px;
  `,
  [Size.Small]: css`
    gap: ${spacing[200]}px;
  `,
  [Size.Default]: css`
    gap: ${spacing[200]}px;
  `,
  [Size.Large]: css`
    gap: ${spacing[200]}px;
  `,
};

export const inputWrapperStyle = ({
  overflow,
  size,
}: {
  overflow: Overflow;
  size: Size;
}) => {
  const baseWrapperStyle = css`
    flex-grow: 1;
    width: 100%;
  `;

  switch (overflow) {
    case Overflow.scrollX: {
      return css`
        ${baseWrapperStyle}
        display: block;
        height: ${inputHeight(size)}px;
        white-space: nowrap;
        overflow-x: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;
        line-height: 1;

        &::-webkit-scrollbar {
          display: none;
        }

        & > .${chipClassName} {
          margin-inline: 2px;

          &:first-child {
            margin-inline-start: 0;
          }

          &:last-child {
            margin-inline-end: 0;
          }
        }
      `;
    }

    // TODO - look into animating input element height on wrap
    case Overflow.expandY: {
      return css`
        ${baseWrapperStyle}
        display: flex;
        flex-wrap: wrap;
        gap: ${flexGap}px;
        overflow-x: hidden;
        min-height: ${inputHeight(size)}px;
        max-height: calc((${inputHeight(size) * 3}px) + (${flexGap}px * 2));
      `;
    }
  }
};

export const baseInputElementStyle = css`
  font-family: ${fontFamilies.default};
  width: 100%;
  border: none;
  cursor: inherit;
  background-color: inherit;
  color: inherit;
  box-sizing: content-box;
  padding: 0;
  margin: 0;
  text-overflow: ellipsis;
  vertical-align: top;

  // Only add padding if there are chips
  &:not(:first-child) {
    padding-left: ${spacing[100]}px;
  }

  &:placeholder-shown {
    min-width: 100%;
  }
  &:focus {
    outline: none;
  }
`;

export const inputElementThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &::placeholder {
      color: ${palette.gray.base};
    }
  `,
  [Theme.Dark]: css`
    &::placeholder {
      color: ${palette.gray.dark1};
    }
  `,
};

export const inputElementDisabledThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &::placeholder {
      color: ${palette.gray.base};
    }
  `,
  [Theme.Dark]: css`
    &::placeholder {
      color: ${palette.gray.dark1};
    }
  `,
};

export const inputElementSizeStyle = (size: Size) => css`
  height: ${inputHeight(size)}px;
  font-size: ${fontSize[size]}px;
  line-height: ${lineHeight[size]}px;
  min-width: ${fontSize[size]}px;
`;

export const inputElementTransitionStyles = (isOpen: boolean) => css`
  /*
  * Immediate transition in, slow transition out. 
  * '-in' transition is handled by \`scroll-behavior\` 
  */
  transition: width ease-in-out ${isOpen ? '0s' : '100ms'};
`;

// Previously defined in inputWrapperStyle
/** Should only be applied to a multiselect */
export const multiselectInputElementStyle = (
  size: Size,
  inputValue?: string,
) => {
  const inputLength = inputValue?.length ?? 0;
  return css`
    width: ${inputLength * fontSize[size]}px;
    max-width: 100%;
  `;
};

export const clearButtonStyle = css`
  // Add a negative margin so the button takes up the same space as the regular icons
  margin-block: calc(${caretIconSize / 2}px - 100%);
  margin-inline: -6px;
`;

export const iconStyle = css`
  height: ${caretIconSize}px;
  width: ${caretIconSize}px;
`;

export const labelDescriptionContainerStyle = css`
  margin-bottom: ${spacing[100]}px;
  display: flex;
  flex-direction: column;
`;

export const labelDescriptionLargeStyles = css`
  font-size: ${typeScales.large.fontSize}px;
  line-height: ${typeScales.large.lineHeight}px;
`;

export const comboboxOverflowShadowStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    ::after {
      box-shadow: 0px 0px 7px 5px ${transparentize(0.85, palette.black)};
    }
  `,
  [Theme.Dark]: css`
    ::after {
      width: 95%;
      box-shadow: 0px -7px 12px 5px rgb(0 0 0 / 50%);
    }
  `,
};

export const getCaretIconFill = (theme: Theme) =>
  color[theme].icon.primary.default;

export const getCaretIconDisabledFill = (theme: Theme) =>
  color[theme].icon.disabled.default;
