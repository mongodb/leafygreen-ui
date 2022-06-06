/**
 * Styles
 */

import { css, cx, keyframes } from '@leafygreen-ui/emotion';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies, Mode, typeScales } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';
import { ComboboxSize, Overflow } from './Combobox.types';

/** Constants */

/**
 * Width of the widest character (in px)
 */
const maxCharWidth: Record<ComboboxSize, number> = {
  [ComboboxSize.Default]: typeScales.body1.fontSize,
  [ComboboxSize.Large]: typeScales.body2.fontSize,
};

/**
 * Size of combobox x & y padding (in px)
 */
const comboboxPadding: Record<ComboboxSize, { x: number; y: number }> = {
  [ComboboxSize.Default]: { x: 7, y: 5 },
  [ComboboxSize.Large]: { x: 11, y: 9 },
};

/**
 * Total height of the combobox (in px)
 */
const comboboxHeight: Record<ComboboxSize, number> = {
  [ComboboxSize.Default]: 36,
  [ComboboxSize.Large]: 48,
};

/** Width of the dropdown caret icon (in px) */
const caretIconSize = 16;

export const chipClassName = createUniqueClassName('combobox-chip');

// Helper Functions
const getMinWidth = (size: ComboboxSize) =>
  maxCharWidth[size] + 2 * comboboxPadding[size].x + caretIconSize + 2; // + 2 for border
const getHeight = (size: ComboboxSize) =>
  comboboxHeight[size] - 2 * comboboxPadding[size].y - 2; // border

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

/**
 * @deprecated
 */
export const _comboboxParentStyle = ({
  darkMode,
  size,
  overflow,
}: {
  darkMode: boolean;
  size: ComboboxSize;
  overflow: Overflow;
}) => {
  const modeStyle = (darkMode: boolean) => {
    if (darkMode) {
      return css``;
    } else {
      return css`
        --lg-combobox-color-error: ${uiColors.red.base};
        --lg-combobox-text-color: ${uiColors.gray.dark3};
        --lg-combobox-text-color-disabled: ${uiColors.gray.dark1};

        --lg-combobox-background-color: ${uiColors.gray.light3};
        --lg-combobox-background-color-focus: ${uiColors.white};
        --lg-combobox-background-color-disabled: ${uiColors.gray.light2};

        --lg-combobox-border-color: ${uiColors.gray.base};
        --lg-combobox-border-color-disabled: ${uiColors.gray.light1};
        --lg-combobox-border-color-error: ${uiColors.red.base};

        --lg-combobox-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
        --lg-combobox-shadow-focus: 0px 4px 4px rgba(6, 22, 33, 0.3);
      `;
    }
  };

  const sizeStyle = (size: ComboboxSize) => {
    switch (size) {
      case ComboboxSize.Default:
        return css`
          --lg-combobox-padding-y: 5px;
          --lg-combobox-padding-x: 7px;
          --lg-combobox-height: calc(
            36px - 2px - 2 * var(--lg-combobox-padding-y)
          );
          --lg-combobox-font-size: ${typeScales.body1.fontSize +
          1}px; // TODO: update this for redesign
          --lg-combobox-line-height: ${typeScales.body1.lineHeight + 1}px;
        `;
      case ComboboxSize.Large:
        return css`
          --lg-combobox-padding-y: 9px;
          --lg-combobox-padding-x: 11px;
          --lg-combobox-height: calc(
            48px - 2px - 2 * var(--lg-combobox-padding-y)
          );
          --lg-combobox-font-size: ${typeScales.body2.fontSize}px;
          --lg-combobox-line-height: ${typeScales.body2.lineHeight}px;
        `;
    }
  };

  return cx(
    modeStyle(darkMode),
    sizeStyle(size),
    css`
      --lg-combobox-icon-height: 16px;
      --lg-combobox-border-radius: 3px;
      --lg-combobox-width: ${overflow === 'expand-x' ? 'unset' : '100%'};
      --lg-combobox-padding: var(--lg-combobox-padding-y)
        var(--lg-combobox-padding-x) var(--lg-combobox-padding-y)
        ${overflow === 'scroll-x' ? '0' : 'var(--lg-combobox-padding-x)'};
      width: var(--lg-combobox-width);
      // TODO: Clean this up 🤮
      min-width: calc(
        ${maxCharWidth[size]}px + var(--lg-combobox-padding-x) * 2 + 2px +
          var(--lg-combobox-icon-height)
      );
    `,
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
  [Mode.Dark]: css``,
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
  [Mode.Dark]: css``,
};

export const comboboxErrorStyles: Record<Mode, string> = {
  [Mode.Light]: css`
    border-color: ${uiColors.red.base};
  `,
  [Mode.Dark]: css``,
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
  [Mode.Dark]: css``,
};

/**
 * @deprecated
 */
export const _comboboxStyle = css`
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  color: var(--lg-combobox-text-color);
  background-color: var(--lg-combobox-background-color);
  box-shadow: var(--lg-combobox-shadow);
  border: 1px solid var(--lg-combobox-border-color);
  border-radius: var(--lg-combobox-border-radius);
  padding: var(--lg-combobox-padding);
  width: var(--lg-combobox-width);
  cursor: text;
  transition: 150ms ease-in-out;
  transition-property: background-color, box-shadow, border-color;

  &[data-disabled='true'] {
    color: var(--lg-combobox-text-color-disabled);
    background-color: var(--lg-combobox-background-color-disabled);
    border-color: var(--lg-combobox-border-color-disabled);
    box-shadow: unset;
    cursor: not-allowed;
  }

  &[data-state='error'] {
    border-color: var(--lg-combobox-border-color-error);
  }
`;

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
  [ComboboxSize.Large]: css``,
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

/** @deprecated */
export const _inputElementStyle = css`
  border: none;
  cursor: inherit;
  background-color: inherit;
  box-sizing: content-box;
  padding: 0;
  margin: 0;
  text-overflow: ellipsis;
  font-size: var(--lg-combobox-font-size);
  line-height: var(--lg-combobox-line-height);
  height: var(--lg-combobox-height);
  width: var(--lg-combobox-input-width, 0);
  min-width: var(--lg-combobox-input-min-width);
  transition: var(--lg-combobox-input-transition);

  &:focus {
    outline: none;
  }
`;

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
  [Mode.Dark]: css``,
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

/** @deprecated */
export const _errorMessageStyle = css`
  font-size: var(--lg-combobox-font-size);
  line-height: var(--lg-combobox-line-height);
  color: var(--lg-combobox-color-error);
  padding-top: var(--lg-combobox-padding-y);
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

/**
 * Menu styles
 */
export const menuWrapperStyle = ({
  darkMode,
  size,
  width = 384,
}: {
  darkMode: boolean;
  size: ComboboxSize;
  width?: number;
}) => {
  let menuModeStyle, menuSizeStyle;

  if (darkMode) {
    menuModeStyle = css``;
  } else {
    menuModeStyle = css`
      --lg-combobox-menu-color: ${uiColors.gray.dark3};
      --lg-combobox-menu-message-color: ${uiColors.gray.dark1};
      --lg-combobox-menu-background-color: ${uiColors.white};
      --lg-combobox-menu-shadow: 0px 3px 7px rgba(0, 0, 0, 0.25);
      --lg-combobox-item-hover-color: ${uiColors.gray.light2};
      --lg-combobox-item-active-color: ${uiColors.blue.light3};
      --lg-combobox-item-wedge-color: ${uiColors.blue.base};
    `;
  }

  switch (size) {
    case ComboboxSize.Default:
      menuSizeStyle = css`
        --lg-combobox-menu-border-radius: 4px;
        --lg-combobox-item-height: 36px;
        --lg-combobox-item-padding-y: 8px;
        --lg-combobox-item-padding-x: 12px;
        --lg-combobox-item-font-size: ${typeScales.body1.fontSize +
        1}px; // TODO: update this
        --lg-combobox-item-line-height: ${typeScales.body1.lineHeight +
        1}px; // TODO: update this
        --lg-combobox-item-wedge-height: 22px;
      `;
      break;
    case ComboboxSize.Large:
      menuSizeStyle = css`
        --lg-combobox-menu-border-radius: 4px;
        --lg-combobox-item-height: 36px;
        --lg-combobox-item-padding-y: 8px;
        --lg-combobox-item-padding-x: 12px;
        --lg-combobox-item-font-size: ${typeScales.body2.fontSize +
        1}px; // TODO: update this
        --lg-combobox-item-line-height: ${typeScales.body2.lineHeight +
        1}px; // TODO: update this
        --lg-combobox-item-wedge-height: 22px;
      `;
      break;
  }

  return cx(
    menuModeStyle,
    menuSizeStyle,
    css`
      width: ${width}px;
      border-radius: var(--lg-combobox-menu-border-radius);

      & > * {
        border-radius: inherit;
      }
    `,
  );
};

export const menuStyle = ({ maxHeight }: { maxHeight: number }) => css`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: ${fontFamilies.default};
  color: var(--lg-combobox-menu-color);
  background-color: var(--lg-combobox-menu-background-color);
  box-shadow: var(--lg-combobox-menu-shadow);
  border-radius: inherit;
  overflow: auto;
  min-height: var(--lg-combobox-item-height);
  max-height: ${maxHeight}px;
  scroll-behavior: smooth;
`;

export const menuList = css`
  position: relative;
  margin: 0;
  padding: 0;
`;

export const menuMessage = css`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: var(--lg-combobox-item-font-size);
  color: var(--lg-combobox-menu-message-color);
  padding: var(--lg-combobox-item-padding-y) var(--lg-combobox-item-padding-x);

  & > svg {
    width: 1em;
    height: 1em;
  }
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
