import { css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';

export const baseStyles = css`
  border-top: 1px solid transparent;
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

export const nestedBorderBottomStyles = css`
  border-bottom: 1px solid ${palette.gray.light2};
`;

export const nestedBgStyles = css`
  background-color: ${palette.gray.light3};
`;