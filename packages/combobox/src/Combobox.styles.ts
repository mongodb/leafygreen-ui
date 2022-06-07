import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies, Mode, typeScales } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';
import { ComboboxSize, Overflow } from './Combobox.types';
import {
  caretIconSize,
  comboboxPadding,
  maxCharWidth,
  comboboxHeight,
} from './constants';

export const chipClassName = createUniqueClassName('combobox-chip');

// Helper Functions
const getMinWidth = (size: ComboboxSize) =>
  maxCharWidth[size] + 2 * comboboxPadding[size].x + caretIconSize + 2; // + 2 for border: ;
const getHeight = (size: ComboboxSize) =>
  comboboxHeight[size] - 2 * comboboxPadding[size].y - 2; // border: ;

export const comboboxParentStyle = (
  size: ComboboxSize,
  overflow?: Overflow,
): string => {
  return cx(
    css`
      width: 100%;
      min-width: ${getMinWidth(size)}px;
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

export const comboboxModeStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark3};
    background-color: ${uiColors.gray.light3};
    box-shadow: 0px 1px 2px ${transparentize(0.7, uiColors.black)};
    border-color: ${uiColors.gray.base};
  `,
  [Mode.Dark]: css``, // TODO: DarkMode
};

export const comboboxSizeStyles = (size: ComboboxSize) => css`
  padding: ${comboboxPadding[size].y}px ${comboboxPadding[size].x}px;
  border-radius: 3px;
`;

export const comboboxDisabledStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    box-shadow: unset;
    cursor: not-allowed;
    color: ${uiColors.gray.dark1};
    background-color: ${uiColors.gray.light2};
    border-color: ${uiColors.gray.light1};
  `,
  [Mode.Dark]: css``, // TODO: DarkMode
};

export const comboboxErrorStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    border-color: ${uiColors.red.base};
  `,
  [Mode.Dark]: css``, // TODO: DarkMode
};

export const comboboxFocusStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    &:focus-within {
      border-color: transparent;
      background-color: ${uiColors.white};
      box-shadow: 0 0 0 3px ${uiColors.focus},
        0px 4px 4px ${transparentize(0.7, uiColors.black)};
    }
  `,
  [Mode.Dark]: css``, // TODO: DarkMode
};

export const inputWrapperStyle = ({
  overflow,
  size,
}: {
  overflow: Overflow;
  size: ComboboxSize;
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
        height: ${getHeight(size)}px;
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
        height: ${getHeight(size)}px;
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
        min-height: ${getHeight(size)}px;
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

  &:placeholder-shown {
    min-width: 100%;
  }
  &:focus {
    outline: none;
  }
`;

export const inputElementSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    height: ${getHeight(ComboboxSize.Default)}px;
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-width: ${maxCharWidth[ComboboxSize.Default]}px;
  `,
  [ComboboxSize.Large]: css`
    height: ${getHeight(ComboboxSize.Large)}px;
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    min-width: ${maxCharWidth[ComboboxSize.Large]}px;
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
  size: ComboboxSize,
  inputValue?: string,
) => {
  const inputLength = inputValue?.length ?? 0;
  return css`
    max-width: 100%;
    width: ${inputLength * maxCharWidth[size]}px;
    // TODO: This doesn't quite work. Fix this
    max-width: calc(100% - ${caretIconSize}px);
  `;
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

export const endIconStyle = (size: ComboboxSize) => css`
  height: ${caretIconSize}px;
  width: ${caretIconSize}px;
  margin-inline-end: calc(${comboboxPadding[size].x}px / 2);
`;

export const errorMessageModeStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${uiColors.red.base};
  `,
  [Mode.Dark]: css``, // TODO: DarkMode
};

export const errorMessageSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    padding-top: ${comboboxPadding[ComboboxSize.Default].y}px;
  `,
  [ComboboxSize.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    padding-top: ${comboboxPadding[ComboboxSize.Large].y}px;
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

// TODO: Remove this during refresh update
export const _tempLabelDescriptionOverrideStyle: Record<ComboboxSize, string> =
  {
    [ComboboxSize.Default]: css`
      font-family: ${fontFamilies.legacy};
      font-size: ${typeScales.body1.fontSize}px;
      line-height: ${typeScales.body1.lineHeight}px;
    `,
    [ComboboxSize.Large]: css`
      font-family: ${fontFamilies.legacy};
      font-size: ${typeScales.body2.fontSize}px;
      line-height: ${typeScales.body2.lineHeight}px;
    `,
  };
