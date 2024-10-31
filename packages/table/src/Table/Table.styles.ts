import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  border-spacing: 0;
  border-collapse: collapse;
  width: 100%;

  &:after {
    content: '';
    display: block;
    height: var(--pseudo-height);
  }
`;

export const themeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.dark3};
  `,
};

export const tableContainerStyles = css`
  overflow: auto;
  width: 100%;
  position: relative;
`;

export const getVirtualStyles = (isVirtual = false, totalSize: number) => css`
  ${isVirtual &&
  css`
    position: relative;
    /* height: ${totalSize}px; */
  `}
`;

export const getVirtualDynamicStyles = (
  isVirtual = false,
  startPosition: number,
) => css`
  ${isVirtual &&
  css`
    /* position: absolute;
    top: 0;
    left: 0;
    transform: translate3d(0, ${startPosition}px, 0);
    width: 100%; */

    thead {
      /* top: -${startPosition}px; */
      /* transform: translate3d(0, ${startPosition / 2}px, 0); */
      /* top: 0; */
      /* position: absolute; */
    }
  `}
`;
