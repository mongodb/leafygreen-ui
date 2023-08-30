import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  Size,
  typeScales,
} from '@leafygreen-ui/tokens';

import { characterWidth } from './constants';
import { DateSegment } from './DateInputSegment.types';

export const baseStyles = css`
  font-family: ${fontFamilies.default};
  /* font-family: ${fontFamilies.code}; */
  font-size: ${BaseFontSize.Body1}px;
  font-variant: tabular-nums;
  text-align: center;
  border: none;
  border-radius: 0;
  padding: 0;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield; /* Firefox */

  &:focus {
    outline: none;
  }

  // TODO: Remove if not using small caps
  /* &::placeholder {
    font-variant: all-small-caps;
    font-size: 1.25em;
  } */
`;

export const segmentThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: transparent;
    color: ${palette.black};

    &::placeholder {
      color: ${palette.gray.light1};
    }

    &:focus {
      background-color: ${palette.blue.light3};
    }
  `,
  [Theme.Dark]: css`
    background-color: transparent;
    color: ${palette.gray.light2};

    &::placeholder {
      color: ${palette.gray.dark1};
    }

    &:focus {
      background-color: ${palette.blue.dark3};
    }
  `,
};

export const fontSizeStyles: Record<BaseFontSize, string> = {
  [BaseFontSize.Body1]: css`
    --base-font-size: ${BaseFontSize.Body1}px;
  `,
  [BaseFontSize.Body2]: css`
    --base-font-size: ${BaseFontSize.Body2}px;
  `,
};

export const segmentSizeStyles: Record<Size, string> = {
  [Size.XSmall]: css`
    font-size: ${typeScales.body1.fontSize}px;
  `,
  [Size.Small]: css`
    font-size: ${typeScales.body1.fontSize}px;
  `,
  [Size.Default]: css`
    font-size: var(--base-font-size, ${typeScales.body1.fontSize}px);
  `,
  [Size.Large]: css`
    font-size: ${18}px; // Intentionally off-token
  `,
};

export const segmentWidthStyles: Record<DateSegment, string> = {
  day: css`
    width: ${2 * characterWidth.D}ch;
  `,
  month: css`
    width: ${2 * characterWidth.M}ch;
  `,
  year: css`
    width: ${4 * characterWidth.Y}ch;
  `,
};
