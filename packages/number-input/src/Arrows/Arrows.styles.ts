import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { wrapperClassName } from '../Input/Input.styles';

export const arrowsBaseStyles = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: ${spacing[2]}px;
  height: 100%;
  justify-content: center;
  translate: 16px 0;
  transition: translate ${transitionDuration.default}ms ease-in-out;
`;

export const arrowsAnimateStyles = css`
  .${wrapperClassName}:hover &,
  .${wrapperClassName}:focus-within & {
    translate: 0 0;
  }
`;

export const arrowDisabledStyles = css`
  pointer-events: none;
`;

export const arrowBaseStyles = css`
  all: unset;
  display: flex;
  position: relative;
  height: 12px;
  width: 8px;

  &:hover {
    cursor: pointer;
  }

  svg {
    position: absolute;
    translate: -50% -50%;
    top: 50%;
    left: 50%;
  }
`;

export const arrowThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};

    &:hover,
    &:active {
      color: ${palette.gray.dark3};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.base};

    &:hover,
    &:active {
      color: ${palette.gray.light1};
    }
  `,
};

export const downArrowRotateStyles = css`
  rotate: 180deg;
`;
