import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { ComboboxSize } from './Combobox.types';

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

/** @deprecated */
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
