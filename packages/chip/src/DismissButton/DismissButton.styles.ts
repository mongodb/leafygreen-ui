import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { variantColor } from '../Chip/Chip.styles';
import { Variant } from '../Chip/Chip.types';

/**
 * Chip Dismiss Button
 */
export const chipButtonStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: background-color ${transitionDuration.faster}ms ease-in-out;
  padding: 0 2px;
  align-self: stretch;
`;

export const chipButtonThemeStyle = (variant: Variant, theme: Theme) => css`
  color: ${variantColor[variant][theme].dismissColor};

  &:not(:disabled):hover,
  &:not(:disabled):focus-visible {
    color: ${variantColor[variant][theme].dismissFocusColor};
    background-color: ${variantColor[variant][theme].dismissFocuBgColor};
  }
`;

export const chipButtonBaseDisabledStyles = css`
  &:disabled {
    cursor: not-allowed;
  }
`;

export const chipButtonDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:disabled {
      color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    &:disabled {
      color: ${palette.gray.dark2};
    }
  `,
};
