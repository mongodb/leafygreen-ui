import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import {
  color,
  Size,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { wrapperClassName } from '../Input/Input.styles';

export const arrowsBaseStyles = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  height: 100%;
  justify-content: center;
  transition: translate ${transitionDuration.default}ms ease-in-out;
`;

export const arrowsSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    right: ${spacing[200]}px;
    translate: ${spacing[400]}px 0;
  `,
  [Size.Small]: css`
    right: ${spacing[200]}px;
    translate: ${spacing[400]}px 0;
  `,
  [Size.Default]: css`
    right: ${spacing[300]}px;
    translate: ${spacing[600]}px 0;
  `,
  [Size.Large]: css`
    right: ${spacing[300]}px;
    translate: ${spacing[600]}px 0;
  `,
};

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

export const getArrowThemeStyles = (theme: Theme) => css`
  color: ${color[theme].icon.primary.default};

  &:hover,
  &:active {
    color: ${color[theme].icon.primary.hover};
  }
`;

export const downArrowRotateStyles = css`
  rotate: 180deg;
`;
