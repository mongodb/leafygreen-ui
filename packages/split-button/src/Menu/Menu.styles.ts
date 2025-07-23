import { Size } from '@leafygreen-ui/button';
import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { Variant } from '../SplitButton/SplitButton.types';

export const triggerBaseStyles = css`
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  margin-left: -1px;

  &:focus,
  &:focus-visible,
  &:hover {
    z-index: 1;
  }
`;

export const triggerBorderColor: Record<Theme, Record<Variant, string>> = {
  [Theme.Light]: {
    [Variant.Default]: palette.gray.base,
    [Variant.Primary]: palette.green.light2,
    [Variant.Danger]: palette.red.light2,
  },
  [Theme.Dark]: {
    [Variant.Default]: palette.gray.light1,
    [Variant.Primary]: palette.green.base,
    [Variant.Danger]: palette.red.light2,
  },
};

export const triggerCaretColor: Record<Theme, Record<Variant, string>> = {
  [Theme.Light]: {
    [Variant.Default]: palette.gray.dark2,
    [Variant.Primary]: palette.green.light2,
    [Variant.Danger]: palette.red.light3,
  },
  [Theme.Dark]: {
    [Variant.Default]: palette.gray.light2,
    [Variant.Primary]: palette.green.light2,
    [Variant.Danger]: palette.red.light2,
  },
};

export const triggerThemeStyles = (theme: Theme, variant: Variant) => css`
  &,
  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    border-left-color: ${triggerBorderColor[theme][variant]};
  }

  svg {
    color: ${triggerCaretColor[theme][variant]};
  }
`;

export const triggerSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    width: 24px;
  `,
  [Size.Small]: css`
    width: 32px;
  `,
  [Size.Default]: css`
    width: 32px;
  `,
  [Size.Large]: css`
    width: 44px;
  `,
};
