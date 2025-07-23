import { css } from '@leafygreen-ui/emotion';
import { leftGlyphClassName } from '@leafygreen-ui/input-option';
import {
  descriptionClassName,
  titleClassName,
} from '@leafygreen-ui/input-option';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontWeights, spacing, typeScales } from '@leafygreen-ui/tokens';

import { ComboboxSize } from '../types';

/**
 * Styles
 */

export const largeStyles = css`
  .${descriptionClassName}, .${titleClassName} {
    font-size: ${typeScales.body2.fontSize}px;
    line-height: 20px;
  }
`;

export const checkMarkSizeStyle: Record<ComboboxSize, string> = {
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
  font-weight: ${isSelected ? fontWeights.bold : fontWeights.regular};
`;

export const iconThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};
  `,
};

export const iconHighlightedStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.dark1};
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light3};
  `,
};

export const iconDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

export const checkMarkThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light1};
  `,
};

export const checkMarkDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
  `,
};

export const multiselectIconPosition = css`
  .${leftGlyphClassName} {
    align-self: baseline;
    position: relative;
    // aligns the checkbox with the option name
    top: 1px;
  }
`;
export const multiselectIconLargePosition = css`
  .${leftGlyphClassName} {
    // aligns the checkbox with the option name
    top: 3px;
  }
`;
