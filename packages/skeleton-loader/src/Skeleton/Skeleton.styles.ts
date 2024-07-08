import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { Size } from './Skeleton.types';

interface SkeletonStyleArgs {
  enableAnimations: boolean;
}
export const getSkeletonBaseStyles = ({
  enableAnimations,
}: SkeletonStyleArgs) => css`
  width: 100%;
  border-radius: ${spacing[150]}px;
  background-position: 50vw 0;

  ${enableAnimations &&
  css`
    animation: SkeletonShimmer 1.5s infinite linear;

    @keyframes SkeletonShimmer {
      to {
        background-position: 100vw 0;
      }
    }
  `}
`;

export const rootStyles = css`
  width: 100%;
  border-radius: 6px;
`;

export const sizeStyles: Record<Size, string> = {
  [Size.Small]: css`
    height: ${spacing[400]}px;
  `,
  [Size.Default]: css`
    height: ${spacing[800]}px;
  `,
  [Size.Large]: css`
    height: ${spacing[1200]}px;
  `,
};

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background: linear-gradient(
        110deg,
        ${palette.gray.dark2} 35%,
        ${palette.gray.dark1},
        ${palette.gray.dark2} 65%
      )
      0 0/ 100vw 100% fixed;
  `,
  [Theme.Light]: css`
    background: linear-gradient(
        110deg,
        ${palette.gray.light2} 35%,
        ${palette.gray.light3},
        ${palette.gray.light2} 65%
      )
      0 0/ 100vw 100% fixed;
  `,
};
