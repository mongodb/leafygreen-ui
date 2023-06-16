import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { wrapperClassName } from '../Input/Input.styles';
import { Size } from '../NumberInput/NumberInput.types';

export const translateStyles = css`
  translate: 4px 0;
`;

export const animateStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      translate: -12px 0;
    }
  `,
  [Size.Small]: css`
    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      translate: -12px 0;
    }
  `,
  [Size.Default]: css`
    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      translate: -12px 0;
    }
  `,
};

export const disabledStyles = css`
  cursor: not-allowed;
`;

export const wrapperBaseStyles = css`
  position: absolute;
  display: flex;

  translate: 30px 0;

  .${wrapperClassName}:hover &,
  .${wrapperClassName}:focus-within & {
    transition: translate ${transitionDuration.default}ms ease-in-out;
  }
`;

export const transitionStyle = css`
  transition: translate ${transitionDuration.default}ms ease-in-out;
`;

export const wrapperThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
};

export const wrapperSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    right: 10px;
  `,
  [Size.Small]: css`
    right: 10px;
  `,
  [Size.Default]: css`
    right: 12px;
  `,
};
