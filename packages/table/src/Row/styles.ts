import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  border-top: 1px solid transparent;

  // emulating a border bottom on the last nested row
  &:not([data-depth="0"]) + tr[data-depth="0"] {
    border-top: 1px solid ${palette.gray.light2};
  }
`;

export const zebraStyles = css`
  &:nth-of-type(even) {
    background-color: ${palette.gray.light3};
  }

  &:nth-of-type(odd) > th {
    background-color: ${palette.white};
  }
`;

export const nestedBorderTopStyles = css`
  border-top: 1px solid ${palette.gray.light2};
`;

export const nestedBgStyles = css`
  background-color: ${palette.gray.light3};
`;