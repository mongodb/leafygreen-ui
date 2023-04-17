import { css } from '@leafygreen-ui/emotion';
import { spacing } from '@leafygreen-ui/tokens';

import { fontSize, lineHeight } from '../Chip/Chip.styles';
import { ComboboxSize } from '../Combobox.types';
import {
  getMenuItemHeight,
  menuItemPadding,
} from '../ComboboxMenu/Menu.styles';

/**
 * Styles
 */

export const comboboxOptionSizeStyle = (size: ComboboxSize) => css`
  font-size: ${fontSize[size]}px;
  line-height: ${lineHeight[size]}px;
  min-height: ${getMenuItemHeight(size)}px;
  padding: ${menuItemPadding[size].y}px ${menuItemPadding[size].x}px;
  gap: ${spacing[1]}px;

  &:before {
    max-height: ${getMenuItemHeight(size)}px;
  }
`;

export const checkIconStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    min-width: ${spacing[3]}px;
  `,
  [ComboboxSize.Small]: css`
    min-width: ${spacing[3]}px;
  `,
  [ComboboxSize.Default]: css`
    min-width: ${spacing[3]}px;
  `,
  [ComboboxSize.Large]: css`
    min-width: ${spacing[4]}px;
  `,
};

export const flexSpan = css`
  display: inline-flex;
  gap: ${spacing[2]}px;
  justify-content: start;
  align-items: inherit;
  overflow-wrap: anywhere;
`;

export const checkBoxBaseStyles = css`
  pointer-events: none;
  gap: 0;

  label {
    gap: 0;
    align-items: center;
  }
`;

export const disallowPointer = css`
  pointer-events: none;
`;

export const displayNameStyle = (isSelected: boolean) => css`
  font-weight: ${isSelected ? 'bold' : 'normal'};
`;
