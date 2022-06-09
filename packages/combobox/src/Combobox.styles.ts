import { css, cx } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import isNull from 'lodash/isNull';
import { fontFamilies, spacing, typeScales } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';
import { ComboboxSize as Size, Overflow, Theme } from './Combobox.types';

/**
 * Width of the widest character (in px)
 */
export const maxCharWidth: Record<Size, number> = {
  [Size.Default]: typeScales.body1.fontSize,
  [Size.Large]: typeScales.body2.fontSize,
};

/**
 * Vertical padding on a chip (in px)
 */
export const chipWrapperPaddingY = {
  [Size.Default]: 2,
  [Size.Large]: 4,
} as const;

/**
 * Height of the input element (in px)
 */
const inputHeight: Record<Size, number> = {
  [Size.Default]:
    typeScales.body1.lineHeight + 2 * chipWrapperPaddingY[Size.Default], // 20
  [Size.Large]:
    typeScales.body2.lineHeight + 2 * chipWrapperPaddingY[Size.Large], // 28
};

/**
 * Size of combobox x & y padding (in px)
 */
export const comboboxPadding: Record<Size, { x: number; y: number }> = {
  [Size.Default]: {
    y: (36 - inputHeight[Size.Default] - 2) / 2,
    x: 8 - 1,
  },
  [Size.Large]: {
    y: (48 - inputHeight[Size.Large] - 2) / 2,
    x: 8 - 1,
  },
};

/** Width of the dropdown caret icon (in px) */
export const caretIconSize = spacing[3];

const minWidth: Record<Size, number> = {
  [Size.Default]:
    maxCharWidth[Size.Default] +
    2 * comboboxPadding[Size.Default].x +
    caretIconSize +
    2, // + 2 for border: ;
  [Size.Large]:
    maxCharWidth[Size.Large] +
    2 * comboboxPadding[Size.Large].x +
    caretIconSize +
    2, // + 2 for border: ;
};

export const chipClassName = createUniqueClassName('combobox-chip');

export const comboboxParentStyle = (
  size: Size,
  overflow?: Overflow,
): string => {
  return cx(
    css`
      width: 100%;
      min-width: ${minWidth[size]}px;
    `,
    {
      [css`
        width: unset;
      `]: overflow === Overflow.expandX,
    },
  );
};

export const baseComboboxStyles = css`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  cursor: text;
  transition: 150ms ease-in-out;
  transition-property: background-color, box-shadow, border-color;
  border: 1px solid;
  width: inherit;
`;

export const comboboxThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${uiColors.gray.dark3};
    background-color: ${uiColors.gray.light3};
    box-shadow: 0px 1px 2px ${transparentize(0.7, uiColors.black)};
    border-color: ${uiColors.gray.base};
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

export const comboboxSizeStyles = (size: Size) => css`
  padding: ${comboboxPadding[size].y}px ${comboboxPadding[size].x}px;
  border-radius: 3px;
`;

export const comboboxDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    box-shadow: unset;
    cursor: not-allowed;
    color: ${uiColors.gray.dark1};
    background-color: ${uiColors.gray.light2};
    border-color: ${uiColors.gray.light1};
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

export const comboboxErrorStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${uiColors.red.base};
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

export const comboboxFocusStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus-within {
      border-color: transparent;
      background-color: ${uiColors.white};
      box-shadow: 0 0 0 3px ${uiColors.focus},
        0px 4px 4px ${transparentize(0.7, uiColors.black)};
    }
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
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
    width: inherit;
  `;

  switch (overflow) {
    case Overflow.scrollX: {
      return css`
        ${baseWrapperStyle}
        display: block;
        height: ${inputHeight[size]}px;
        padding-left: ${comboboxPadding[size].x}px;
        white-space: nowrap;
        overflow-x: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;

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

    case Overflow.expandX: {
      return css`
        ${baseWrapperStyle}
        display: flex;
        gap: 4px;
        flex-wrap: nowrap;
        white-space: nowrap;
        height: ${inputHeight[size]}px;
      `;
    }

    // TODO - look into animating input element height on wrap
    case Overflow.expandY: {
      return css`
        ${baseWrapperStyle}
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        overflow-x: visible;
        min-height: ${inputHeight[size]}px;
      `;
    }
  }
};

export const baseInputElementStyle = css`
  width: 100%;
  border: none;
  cursor: inherit;
  background-color: inherit;
  box-sizing: content-box;
  padding: 0;
  margin: 0;
  text-overflow: ellipsis;
  padding-left: 4px;

  &:placeholder-shown {
    min-width: 100%;
  }
  &:focus {
    outline: none;
  }
`;

export const inputElementSizeStyle: Record<Size, string> = {
  [Size.Default]: css`
    height: ${inputHeight[Size.Default]}px;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-width: ${maxCharWidth[Size.Default]}px;
  `,
  [Size.Large]: css`
    height: ${inputHeight[Size.Large]}px;
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    min-width: ${maxCharWidth[Size.Large]}px;
  `,
};

// We don't transition the input width then overflow == expand-x
export const inputElementTransitionStyles = (
  isOpen: boolean,
  overflow: Overflow,
) =>
  cx({
    [css`
      /*
    * Immediate transition in, slow transition out. 
    * '-in' transition is handled by \`scroll-behavior\` 
    */
      transition: width ease-in-out ${isOpen ? '0s' : '100ms'};
    `]: overflow !== Overflow.expandX,
  });

// Previously defined in inputWrapperStyle
/** Should only be applied to a multiselect */
export const multiselectInputElementStyle = (
  size: Size,
  inputValue?: string,
) => {
  const inputLength = inputValue?.length ?? 0;
  return css`
    max-width: 100%;
    width: ${inputLength * maxCharWidth[size]}px;
    // TODO: This doesn't quite work. Fix this
    max-width: calc(100% - ${2 * caretIconSize}px);
  `;
};

// If there are chips, we remove the left padding from the input element
export const multiselectInputElementPadding = (
  selection: string | Array<string> | null,
) => {
  if (
    typeof selection === 'object' &&
    !isNull(selection) &&
    selection.length > 0
  )
    return css`
      padding-left: 0px;
    `;
  return '';
};

export const clearButtonStyle = css`
  // Add a negative margin so the button takes up the same space as the regular icons
  margin-block: calc(${caretIconSize / 2}px - 100%);
`;

// Temporary styles to override redesigned icon-button
// TODO: Remove for UI refresh
export const clearButtonFocusOverrideStyles = css`
  &:focus {
    box-shadow: unset;
    &::before {
      background-color: ${uiColors.blue.light2};
    }
  }
`;

export const endIconStyle = (size: Size) => css`
  height: ${caretIconSize}px;
  width: ${caretIconSize}px;
  margin-inline-end: calc(${comboboxPadding[size].x}px / 2);
`;

export const errorMessageThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${uiColors.red.base};
  `,
  [Theme.Dark]: css``, // TODO: DarkMode
};

export const errorMessageSizeStyle: Record<Size, string> = {
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

// TODO: Remove this during refresh update
export const _tempLabelDescriptionOverrideStyle: Record<Size, string> = {
  [Size.Default]: css`
    font-family: ${fontFamilies.legacy};
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
  `,
  [Size.Large]: css`
    font-family: ${fontFamilies.legacy};
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
  `,
};
