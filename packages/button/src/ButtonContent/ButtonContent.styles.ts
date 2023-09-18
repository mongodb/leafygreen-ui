import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { Size, Variant } from '../types';

const rippleOpacity = 0.76;

export const rippleColors: Record<Theme, Record<Variant, string>> = {
  [Theme.Light]: {
    [Variant.Default]: palette.gray.light2,
    [Variant.Primary]: palette.green.dark1,
    [Variant.PrimaryOutline]: transparentize(rippleOpacity, palette.green.base),
    [Variant.Danger]: palette.red.light1,
    [Variant.DangerOutline]: transparentize(rippleOpacity, palette.red.base),
    [Variant.BaseGreen]: palette.green.light1,
  },
  [Theme.Dark]: {
    [Variant.Default]: palette.gray.base,
    [Variant.Primary]: palette.green.dark1,
    [Variant.PrimaryOutline]: transparentize(rippleOpacity, palette.green.base),
    [Variant.Danger]: palette.red.dark2,
    [Variant.DangerOutline]: transparentize(rippleOpacity, palette.red.light1),
    [Variant.BaseGreen]: palette.green.dark1,
  },
};

export const rippleStyle = css`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 5px;
`;

export const darkModeRightGlyphStyles = css`
  justify-content: space-between;
`;

export const buttonContentStyle = css`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  position: relative;
  user-select: none;
  z-index: 0;
  transition: all ${transitionDuration.default} ease-in-out;
`;

export const buttonContentSizeStyle: Record<Size, string> = {
  [Size.XSmall]: css`
    padding: 0 7px; // 8px - 1px border
    gap: 6px;
  `,

  [Size.Small]: css`
    padding: 0 11px; // 12px - 1px border
    gap: 6px;
  `,

  [Size.Default]: css`
    padding: 0 11px; // 12px - 1px border
    gap: 6px;
  `,

  [Size.Large]: css`
    padding: 0 15px; // 16px - 1px border
    gap: 8px;
  `,
};

export const centeredSpinnerContainerStyles = css`
  position: absolute;
`;

export const centeredSpinnerStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const buttonSpinnerSize: Record<Size, number> = {
  [Size.XSmall]: 16,
  [Size.Small]: 16,
  [Size.Default]: 16,
  [Size.Large]: 20,
};

export const spinnerColor: Record<Theme, string> = {
  [Theme.Dark]: palette.gray.light1,
  [Theme.Light]: palette.gray.dark1,
};

export const hiddenContentStyles = css`
  visibility: hidden;
`;

export const leftGlyphStyles = css`
  justify-self: right;
`;

export const rightGlyphStyles = css`
  justify-self: left;
`;
