/**
 * Styles
 */

import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { isArray } from 'lodash';
import { ComboboxSizeType, OverflowType } from './Combobox.types';

export const comboboxParentStyle = ({
  darkMode,
  size,
  overflow,
}: {
  darkMode: boolean;
  size: ComboboxSizeType;
  overflow: OverflowType;
}) => {
  const modeStyle = (darkMode: boolean) => {
    if (darkMode) {
      return css``;
    } else {
      return css`
        --lg-combobox-text-color: ${uiColors.gray.dark3};
        --lg-combobox-text-color-disabled: ${uiColors.gray.dark1};

        --lg-combobox-background-color: ${uiColors.gray.light3};
        --lg-combobox-background-color-focus: ${uiColors.white};
        --lg-combobox-background-color-disabled: ${uiColors.gray.light2};

        --lg-combobox-border-color: ${uiColors.gray.base};
        --lg-combobox-border-color-disabled: ${uiColors.gray.light1};

        --lg-combobox-shadow: 0px 1px 2px rgba(6, 22, 33, 0.3);
        --lg-combobox-shadow-focus: 0px 4px 4px rgba(6, 22, 33, 0.3);
      `;
    }
  };

  const sizeStyle = (size: ComboboxSizeType) => {
    switch (size) {
      case 'default':
        return css`
          --lg-combobox-padding-y: 5px;
          --lg-combobox-padding-x: 7px;
          --lg-combobox-height: 24px;
          --lg-combobox-line-height: 20px;
          --lg-combobox-border-radius: 3px;
          --lg-combobox-input-default-width: 12ch;
        `;
    }
  };

  return cx(
    modeStyle(darkMode),
    sizeStyle(size),
    css`
      --lg-combobox-width: ${overflow === 'expand-x' ? 'unset' : '100%'};
      --lg-combobox-padding: var(--lg-combobox-padding-y)
        ${overflow === 'scroll-x' ? '0' : 'var(--lg-combobox-padding-x)'};
      width: var(--lg-combobox-width);
    `,
  );
};

export const comboboxStyle = css`
  padding: var(--lg-combobox-padding);
  color: var(--lg-combobox-text-color);
  background-color: var(--lg-combobox-background-color);
  box-shadow: var(--lg-combobox-shadow);
  border: 1px solid var(--lg-combobox-border-color);
  border-radius: var(--lg-combobox-border-radius);
  width: var(--lg-combobox-width);
  cursor: text;
  transition: 150ms ease-in-out;
  transition-property: background-color, box-shadow;

  &:focus-within {
    background-color: var(--lg-combobox-background-color-focus);
    box-shadow: var(--lg-combobox-shadow-focus);
  }

  &[data-disabled='true'] {
    color: var(--lg-combobox-text-color-disabled);
    background-color: var(--lg-combobox-background-color-disabled);
    border-color: var(--lg-combobox-border-color-disabled);
    box-shadow: unset;
    cursor: not-allowed;
  }
`;

export const interactionRingStyle = css`
  width: var(--lg-combobox-width);
`;

export const inputWrapperStyle = ({
  overflow,
  isOpen,
  selection,
}: {
  overflow: OverflowType;
  isOpen: boolean;
  selection: number | Array<number> | null;
}) => {
  const isUnfocusedMultiselect =
    !isOpen && isArray(selection) && selection.length > 0;

  const baseWrapperStyle = css`
    width: var(--lg-combobox-width);

    // The input should be hidden when there are elements selected in a multiselect
    // We don't set \`display: none\` since we need to be able to set .focus() on the element
    --lg-combobox-input-width: ${isUnfocusedMultiselect
      ? '0'
      : 'var(--lg-combobox-input-default-width)'};
  `;

  switch (overflow) {
    case 'scroll-x': {
      return css`
        ${baseWrapperStyle}
        display: block;
        height: var(--lg-combobox-height);
        white-space: nowrap;
        overflow-x: scroll;
        scroll-behavior: smooth;
        scrollbar-width: none;
        /*
         * Immediate transition in, slow transition out. 
         * '-in' transition is handled by \`scroll-behavior\` 
         */
        --lg-combobox-input-transition: width ease-in-out
          ${isUnfocusedMultiselect ? '100ms' : '0'};

        &::-webkit-scrollbar {
          display: none;
        }

        & > * {
          margin-inline: 2px;

          &:first-child {
            margin-inline-start: var(--lg-combobox-padding-x);
          }

          &:last-child {
            margin-inline-start: 0;
            margin-inline-end: var(--lg-combobox-padding-x);
          }
        }
      `;
    }

    case 'expand-x': {
      return css`
        ${baseWrapperStyle}
        display: flex;
        gap: 4px;
        flex-wrap: nowrap;
        white-space: nowrap;
        --lg-combobox-input-transition: width 150ms ease-in-out;
      `;
    }

    // TODO - look into animating input element height on wrap
    case 'expand-y': {
      return css`
        ${baseWrapperStyle}
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        overflow-x: visible;
      `;
    }
  }
};

export const inputElementStyle = css`
  border: none;
  cursor: inherit;
  background-color: inherit;
  box-sizing: content-box;
  padding-block: calc(
    (var(--lg-combobox-height) - var(--lg-combobox-line-height)) / 2
  );
  padding-inline: 0;
  height: var(--lg-combobox-line-height);
  width: var(
    --lg-combobox-input-width,
    var(--lg-combobox-input-default-width, auto)
  );
  transition: var(--lg-combobox-input-transition);

  &:focus {
    outline: none;
  }
`;

// Menu Styles
export const menuWrapperStyle = ({
  darkMode,
  size,
  width = 384,
}: {
  darkMode: boolean;
  size: ComboboxSizeType;
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
    case 'default':
      menuSizeStyle = css`
        --lg-combobox-menu-border-radius: 4px;
        --lg-combobox-item-height: 36px;
        --lg-combobox-item-padding-y: 8px;
        --lg-combobox-item-padding-x: 12px;
        --lg-combobox-item-font-size: 14px;
        --lg-combobox-item-line-height: 20px;

        --lg-combobox-item-wedge-height: 22px;
      `;
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

export const menuStyle = css`
  position: relative;
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: ${fontFamilies.default};
  color: var(--lg-combobox-menu-color);
  background-color: var(--lg-combobox-menu-background-color);
  box-shadow: var(--lg-combobox-menu-shadow);
  border-radius: inherit;
  overflow: hidden;
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
