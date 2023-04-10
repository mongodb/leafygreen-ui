import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  focusRing,
  fontFamilies,
  hoverRing,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

import { chipHeight } from '../Chip/Chip.styles';
import { ComboboxSize as Size, Overflow } from '../Combobox.types';

// Rename the variable defined in chip styles
const inputHeight = chipHeight;

const flexGap = 4;

/**
 * Width of the widest character (in px)
 */
export const maxCharWidth: Record<Size, number> = {
  [Size.XSmall]: typeScales.body1.fontSize,
  [Size.Small]: typeScales.body1.fontSize,
  [Size.Default]: typeScales.body1.fontSize,
  [Size.Large]: typeScales.body2.fontSize,
};

/**
 * Size of combobox x & y padding (in px)
 * (wrapperHeight - inputHeight - (borderTop + borderBottom)) / 2
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
    y: (22 - inputHeight[Size.XSmall] - 2) / 2, // (22 - 18 - 2 ) / 2 = (2) / 2 = 1
    xLeftWithChip: 1,
    xLeftWithoutChip: 10,
    xRight: 4,
  },
  [Size.Small]: {
    y: (28 - inputHeight[Size.Small] - 2) / 2, // (28 - 20 - 2) / 2 = (6) / 2 = 3
    xLeftWithChip: 4,
    xLeftWithoutChip: 10,
    xRight: 8,
  },
  [Size.Default]: {
    y: (36 - inputHeight[Size.Default] - 2) / 2, // (36 - 24 - 2) / 2 = (10) / 2 = 5
    xLeftWithChip: 6,
    xLeftWithoutChip: 12,
    xRight: 12,
  },
  [Size.Large]: {
    y: (48 - inputHeight[Size.Large] - 2) / 2,
    xLeftWithChip: spacing[2] - 1,
    xLeftWithoutChip: spacing[2] - 1,
    xRight: spacing[2] - 1,
  },
};

/** Width of the clear icon (in px) */
export const clearButtonIconSize = 28;

/** Width of the dropdown caret icon (in px) */
export const caretIconSize = spacing[3];

const minWidth: Record<Size, number> = {
  [Size.XSmall]:
    maxCharWidth[Size.XSmall] +
    2 * comboboxPadding[Size.XSmall].xLeftWithChip +
    caretIconSize +
    2, // + 2 for border: ;
  [Size.Small]:
    maxCharWidth[Size.Small] +
    2 * comboboxPadding[Size.Small].xLeftWithChip +
    caretIconSize +
    2, // + 2 for border: ;
  [Size.Default]:
    maxCharWidth[Size.Default] +
    2 * comboboxPadding[Size.Default].xLeftWithChip +
    caretIconSize +
    2, // + 2 for border: ;
  [Size.Large]:
    maxCharWidth[Size.Large] +
    2 * comboboxPadding[Size.Large].xLeftWithChip +
    caretIconSize +
    2, // + 2 for border: ;
};

export const chipClassName = createUniqueClassName('combobox-chip');

export const comboboxParentStyle = (size: Size): string => {
  return css`
    font-family: ${fontFamilies.default};
    width: 100%;
    min-width: ${minWidth[size]}px;
  `;
};

export const baseComboboxStyles = css`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr ${caretIconSize}px;
  align-items: center;
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
    color: ${palette.gray.dark3};
    background-color: ${palette.white};
    border-color: ${palette.gray.base};

    &:hover {
      box-shadow: ${hoverRing[Theme.Light].gray};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
    background-color: ${palette.gray.dark4};
    border-color: ${palette.gray.base};

    &:hover {
      box-shadow: ${hoverRing[Theme.Dark].gray};
    }
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

export const comboboxDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark1};
    background-color: ${palette.gray.light2};
    border-color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark1};
    background-color: ${palette.gray.dark3};
    border-color: ${palette.gray.dark2};
  `,
};

export const comboboxErrorStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    border-color: ${palette.red.light1};
  `,
};

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

export const comboboxSelectionStyles = css`
  grid-template-columns: 1fr ${clearButtonIconSize}px ${caretIconSize}px;
`;

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
        height: ${inputHeight[size]}px;
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
        min-height: ${inputHeight[size]}px;
        max-height: calc((${chipHeight[size] * 3}px) + (${flexGap}px * 2));
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
      color: ${palette.gray.dark1};
    }
  `,
  [Theme.Dark]: css`
    &::placeholder {
      color: ${palette.gray.light1};
    }
  `,
};

export const inputElementSizeStyle: Record<Size, string> = {
  [Size.XSmall]: css`
    height: ${inputHeight[Size.XSmall]}px;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: 16px;
    min-width: ${maxCharWidth[Size.XSmall]}px;
    // Only add padding if there are chips
    &:not(:first-child) {
      padding-left: 4px;
    }
  `,
  [Size.Small]: css`
    height: ${inputHeight[Size.Small]}px;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-width: ${maxCharWidth[Size.Small]}px;
    // Only add padding if there are chips
    &:not(:first-child) {
      padding-left: 4px;
    }
  `,
  [Size.Default]: css`
    height: ${inputHeight[Size.Default]}px;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-width: ${maxCharWidth[Size.Default]}px;
    // Only add padding if there are chips
    &:not(:first-child) {
      padding-left: 4px;
    }
  `,
  [Size.Large]: css`
    height: ${inputHeight[Size.Large]}px;
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    min-width: ${maxCharWidth[Size.Large]}px;
    &:not(:first-child) {
      padding-left: 6px;
    }
  `,
};

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
    width: ${inputLength * maxCharWidth[size]}px;
    max-width: 100%;
  `;
};

export const clearButtonStyle = css`
  // Add a negative margin so the button takes up the same space as the regular icons
  margin-block: calc(${caretIconSize / 2}px - 100%);
`;

export const endIconStyle = css`
  height: ${caretIconSize}px;
  width: ${caretIconSize}px;
`;

export const errorMessageThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
};

export const errorMessageSizeStyle: Record<Size, string> = {
  [Size.XSmall]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: 16px;
    padding-top: ${comboboxPadding[Size.XSmall].y}px;
  `,
  [Size.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    padding-top: ${comboboxPadding[Size.Small].y}px;
  `,
  [Size.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    padding-top: ${comboboxPadding[Size.Default].y}px;
  `,
  [Size.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    padding-top: ${comboboxPadding[Size.Large].y}px;
  `,
};
export const labelDescriptionContainerStyle = css`
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
`;

export const labelDescriptionLargeStyles = css`
  font-size: 18px;
  line-height: 22px;
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
