import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

import { Variant } from './MessageContainer.types';

export const baseStyles = css`
  border-radius: 12px;
  padding: ${spacing[4]}px;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  /* Card Shadow */
  box-shadow: 0px 4px 10px -4px ${palette.black}4D; // 4D is 30% opacity

  position: relative;

  display: flex;
  flex-direction: column;
  gap: ${spacing[200]}px;
`;

export const variantStyles: Record<Variant, Record<Theme, string>> = {
  [Variant.Primary]: {
    [Theme.Dark]: css`
      background-color: ${palette.green.dark3};
    `,
    [Theme.Light]: css`
      background-color: ${palette.green.light3};
    `,
  },
  [Variant.Secondary]: {
    [Theme.Dark]: css`
      background-color: ${palette.gray.dark3};
    `,
    [Theme.Light]: css`
      background-color: ${palette.white};
    `,
  },
};
