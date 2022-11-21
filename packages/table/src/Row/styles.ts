import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css``;

export const zebraStyles = css`
  &:nth-of-type(even) {
    background-color: ${palette.gray.light3};
  }

  &:nth-of-type(odd) > th {
    background-color: ${palette.white};
  }
`;
