import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';

import { Variant } from './RichLinkBadge.types';

export const baseStyles = css`
  font-family: ${fontFamilies.default};
  display: inline-flex;
  gap: 6px;
  align-items: center;
  font-weight: ${fontWeights.regular};
  border-radius: 4px;
  line-height: 18px;
  padding: 0px 6px;
  position: absolute;
  bottom: 8px;
  left: 8px;
`;

export const labelStyles = css`
  line-height: 18px;
`;

export const badgeVariants: Record<Theme, Record<Variant, string>> = {
  [Theme.Dark]: {
    [Variant.Gray]: css`
      background-color: ${palette.gray.dark1};
      & svg {
        color: ${palette.gray.light3};
      }
      & p {
        color: ${palette.gray.light3};
      }
    `,
    [Variant.Blue]: css`
      background-color: ${palette.blue.dark3};
      & svg {
        color: ${palette.blue.light2};
      }
      & p {
        color: ${palette.blue.light2};
      }
    `,
    [Variant.Green]: css`
      background-color: ${palette.green.dark3};
      & svg {
        color: ${palette.green.light2};
      }
      & p {
        color: ${palette.green.light2};
      }
    `,
    [Variant.Red]: css`
      background-color: ${palette.red.dark3};
      & svg {
        color: ${palette.red.light2};
      }
      & p {
        color: ${palette.red.light2};
      }
    `,
    [Variant.Purple]: css`
      background-color: ${palette.purple.dark3};
      & svg {
        color: ${palette.purple.light2};
      }
      & p {
        color: ${palette.purple.light2};
      }
    `,
    [Variant.Yellow]: css`
      background-color: ${palette.yellow.dark3};
      & svg {
        color: ${palette.yellow.light2};
      }
      & p {
        color: ${palette.yellow.light2};
      }
    `,
  },
  [Theme.Light]: {
    [Variant.Gray]: css`
      background-color: ${palette.gray.light2};
      & svg {
        color: ${palette.gray.dark1};
      }
      & p {
        color: ${palette.black};
      }
    `,
    [Variant.Blue]: css`
      background-color: ${palette.blue.light3};
      & svg {
        color: ${palette.blue.dark2};
      }
      & p {
        color: ${palette.blue.dark1};
      }
    `,
    [Variant.Green]: css`
      background-color: ${palette.green.light3};
      & svg {
        color: ${palette.green.dark2};
      }
      & p {
        color: ${palette.green.dark3};
      }
    `,
    [Variant.Red]: css`
      background-color: ${palette.red.light3};
      & svg {
        color: ${palette.red.dark2};
      }
      & p {
        color: ${palette.red.dark3};
      }
    `,
    [Variant.Purple]: css`
      background-color: ${palette.purple.light3};
      & svg {
        color: ${palette.purple.dark2};
      }
      & p {
        color: ${palette.purple.dark3};
      }
    `,
    [Variant.Yellow]: css`
      background-color: ${palette.yellow.light3};
      & svg {
        color: ${palette.yellow.dark2};
      }
      & p {
        color: ${palette.yellow.dark3};
      }
    `,
  },
} as const;
