import { css } from '@leafygreen-ui/emotion';
import { spacing, typeScales } from '@leafygreen-ui/tokens';

import { ComboboxSize } from '../Combobox.types';
import {
  getMenuItemHeight,
  menuItemPadding,
} from '../ComboboxMenu/Menu.styles';

/**
 * Styles
 */

export const comboboxOptionBaseStyle = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;
`;

export const comboboxOptionSizeStyle: Record<ComboboxSize, string> = {
  [ComboboxSize.XSmall]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-height: ${getMenuItemHeight(ComboboxSize.XSmall)}px;
    padding: ${menuItemPadding[ComboboxSize.XSmall].y}px
      ${menuItemPadding[ComboboxSize.XSmall].x}px;
    gap: ${spacing[1]}px;

    &:before {
      max-height: ${getMenuItemHeight(ComboboxSize.XSmall)}px;
    }
  `,
  [ComboboxSize.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-height: ${getMenuItemHeight(ComboboxSize.Small)}px;
    padding: ${menuItemPadding[ComboboxSize.Small].y}px
      ${menuItemPadding[ComboboxSize.Small].x}px;
    gap: ${spacing[1]}px;

    &:before {
      max-height: ${getMenuItemHeight(ComboboxSize.Small)}px;
    }
  `,
  [ComboboxSize.Default]: css`
    font-size: ${typeScales.body1.fontSize}px;
    line-height: ${typeScales.body1.lineHeight}px;
    min-height: ${getMenuItemHeight(ComboboxSize.Default)}px;
    padding: ${menuItemPadding[ComboboxSize.Default].y}px
      ${menuItemPadding[ComboboxSize.Default].x}px;
    gap: ${spacing[1]}px;

    &:before {
      max-height: ${getMenuItemHeight(ComboboxSize.Default)}px;
    }
  `,
  [ComboboxSize.Large]: css`
    font-size: ${typeScales.body2.fontSize}px;
    line-height: ${typeScales.body2.lineHeight}px;
    min-height: ${getMenuItemHeight(ComboboxSize.Large)}px;
    padding: ${menuItemPadding[ComboboxSize.Large].y}px
      ${menuItemPadding[ComboboxSize.Large].x}px;
    gap: ${spacing[2]}px;

    &:before {
      max-height: ${getMenuItemHeight(ComboboxSize.Large)}px;
    }
  `,
};

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
  gap: 8px;
  justify-content: start;
  align-items: inherit;
  overflow-wrap: anywhere;
`;

export const disallowPointer = css`
  pointer-events: none;
`;

export const displayNameStyle = (isSelected: boolean) => css`
  font-weight: ${isSelected ? 'bold' : 'normal'};
`;
