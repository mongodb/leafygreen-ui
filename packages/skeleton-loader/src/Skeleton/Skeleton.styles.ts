import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { Size } from './Skeleton.types';

export const rootStyles = css`
  width: 100%;
  border-radius: 6px;
  background: linear-gradient(90deg, #f0f0f0, #e0e0e0, #f0f0f0) 0 0/ 100vw 100% fixed;
  animation: bgslide 2s infinite linear;

  @keyframes bgslide {
    to {
      background-position: 100vw 0;
    }
  }
`;

export const sizeStyles: Record<Size, string> = {
  [Size.Small]: css`
    height: ${spacing[3]}px;
  `,
  [Size.Default]: css`
    height: ${spacing[5]}px;
  `,
  [Size.Large]: css`
    height: ${spacing[5] + spacing[3]}px;
  `,
};

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light2};
  `,
};
