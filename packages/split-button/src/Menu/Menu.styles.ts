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

export const triggerThemeStyles = (theme: Theme, variant: Variant) => css`
  &,
  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    border-left-color: ${triggerBorderColor[theme][variant]};
  }
`;
