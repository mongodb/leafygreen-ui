import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { wrapperClassName } from '../Input/Input.styles';
import { Size } from '../NumberInput/NumberInput.types';

export const iconErrorStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    translate: 4px 0;
  `,
  [Size.Small]: css`
    translate: 4px 0;
  `,
  [Size.Default]: css`
    translate: 4px 0;
  `,
};

export const iconErrorAnimateStyles: Record<Size, string> = {
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

export const inputErrorAnimateStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    padding-right: ${spacing[1] * 7}px;

    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      padding-right: ${spacing[1] * 11}px;
    }
  `,
  [Size.Small]: css`
    padding-right: ${spacing[1] * 7}px;

    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      padding-right: ${spacing[1] * 11}px;
    }
  `,
  [Size.Default]: css`
    padding-right: ${spacing[1] * 8}px;

    .${wrapperClassName}:hover &,
    .${wrapperClassName}:focus-within & {
      padding-right: ${spacing[1] * 11}px;
    }
  `,
};

export const iconErrorDisabledStyles = css`
  cursor: not-allowed;
`;

export const iconBaseStyles = css`
  position: absolute;
  display: flex;
  transition: translate ${transitionDuration.default}ms ease-in-out;
  translate: 30px 0;
`;

export const iconThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.red.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.red.light1};
  `,
};

export const iconSizeStyles: Record<Size, string> = {
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
