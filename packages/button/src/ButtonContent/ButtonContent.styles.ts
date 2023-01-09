import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette'

import {Size,Variant} from '../types'

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

export const buttonContentStyle = css`
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  pointer-events: none;
  position: relative;
  z-index: 0;
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
