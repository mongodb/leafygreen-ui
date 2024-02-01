import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';

import { Variant } from './types';

export const baseStyle = css`
  font-family: ${fontFamilies.default};
  display: inline-flex;
  align-items: center;
  font-weight: ${fontWeights.bold};
  font-size: 12px;
  line-height: 16px;
  border-radius: 24px;
  height: 18px;
  padding-left: 6px;
  padding-right: 6px;
  text-transform: uppercase;
  border: 1px solid;
  letter-spacing: 0.4px;
`;

export const badgeVariants: Record<Theme, Record<Variant, string>> = {
  [Theme.Dark]: {
    [Variant.LightGray]: css`
      background-color: ${palette.gray.dark1};
      border-color: ${palette.gray.base};
      color: ${palette.gray.light3};
    `,

    [Variant.DarkGray]: css`
      background-color: ${palette.gray.dark3};
      border-color: ${palette.gray.dark2};
      color: ${palette.gray.light2};
    `,

    [Variant.Red]: css`
      background-color: ${palette.red.dark3};
      border-color: ${palette.red.dark2};
      color: ${palette.red.light2};
    `,

    [Variant.Yellow]: css`
      background-color: ${palette.yellow.dark3};
      border-color: ${palette.yellow.dark2};
      color: ${palette.yellow.light2};
    `,

    [Variant.Blue]: css`
      background-color: ${palette.blue.dark2};
      border-color: ${palette.blue.dark1};
      color: ${palette.blue.light2};
    `,

    [Variant.Green]: css`
      background-color: ${palette.green.dark3};
      border-color: ${palette.green.dark2};
      color: ${palette.green.light1};
    `,
  },
  [Theme.Light]: {
    [Variant.LightGray]: css`
      background-color: ${palette.gray.light3};
      border-color: ${palette.gray.light2};
      color: ${palette.gray.dark1};
    `,

    [Variant.DarkGray]: css`
      background-color: ${palette.gray.dark2};
      border-color: ${palette.gray.dark3};
      color: ${palette.white};
    `,

    [Variant.Red]: css`
      background-color: ${palette.red.light3};
      border-color: ${palette.red.light2};
      color: ${palette.red.dark2};
    `,

    [Variant.Yellow]: css`
      background-color: ${palette.yellow.light3};
      border-color: ${palette.yellow.light2};
      color: ${palette.yellow.dark2};
    `,

    [Variant.Blue]: css`
      background-color: ${palette.blue.light3};
      border-color: ${palette.blue.light2};
      color: ${palette.blue.dark1};
    `,

    [Variant.Green]: css`
      background-color: ${palette.green.light3};
      border-color: ${palette.green.light2};
      color: ${palette.green.dark2};
    `,
  },
} as const;
