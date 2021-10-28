import React, { useContext } from 'react';
import { ChipProps, ComboboxSizeType } from './Combobox.types';
import Icon from '@leafygreen-ui/icon';
import { ComboboxContext } from './ComboboxContext';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

const chipWrapperStyle = ({
  darkMode,
  size,
}: {
  darkMode: boolean;
  size: ComboboxSizeType;
}) => {
  let chipModeStyle, chipSizeStyle;

  switch (darkMode) {
    case false:
      chipModeStyle = css`
        --lg-combobox-chip-text-color: ${uiColors.gray.dark3};
        --lg-combobox-chip-icon-color: ${uiColors.gray.dark2};
        --lg-combobox-chip-background-color: ${uiColors.gray.light2};
        --lg-combobox-chip-hover-color: ${uiColors.gray.light1};
        --lg-combobox-chip-focus-color: ${uiColors.gray.light3};
      `;
      break;
    case true:
      chipModeStyle = css``;
  }

  switch (size) {
    case 'default':
      chipSizeStyle = css`
        --lg-combobox-chip-height: 24px;
        --lg-combobox-chip-border-radius: 4px;
        --lg-combobox-chip-font-size: 14px;
        --lg-combobox-chip-line-height: 20px;
        --lg-combobox-chip-padding-x: 6px;
      `;
      break;
  }

  return cx(
    chipModeStyle,
    chipSizeStyle,
    css`
      display: flex;
      align-items: center;
      overflow: hidden;
      height: var(--lg-combobox-chip-height);
      font-size: var(--lg-combobox-chip-font-size);
      line-height: var(--lg-combobox-chip-line-height);
      border-radius: var(--lg-combobox-chip-border-radius);
      border: 1px solid transparent;
      color: var(--lg-combobox-chip-text-color);
      background-color: var(--lg-combobox-chip-background-color);

      // TODO - make these styles better
      &:focus {
        background-color: var(--lg-combobox-chip-focus-color);
        border-color: var(--lg-combobox-chip-background-color);
      }
    `,
  );
};

const chipText = css`
  padding-inline: var(--lg-combobox-chip-padding-x);
`;

const chipButton = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  color: var(--lg-combobox-chip-icon-color);
  cursor: pointer;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 1px;
    background-color: var(--lg-combobox-chip-hover-color);
  }

  &:hover {
    background-color: var(--lg-combobox-chip-hover-color);
  }
`;

export default function Chip({
  value,
  displayName,
  onRemove,
  truncation = 'end',
}: ChipProps) {
  const { darkMode, size } = useContext(ComboboxContext);

  // TODO - handle truncation

  return (
    <span className={chipWrapperStyle({ darkMode, size })}>
      <span className={chipText}>{displayName}</span>
      <button className={chipButton}>
        <Icon glyph="X" />
      </button>
    </span>
  );
}
