import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const wrapperBaseStyles = css`
  margin-left: -1px;

  &:hover,
  &:focus-within {
    z-index: 2;
  }
`;

export const selectDisabledStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    button {
      background-color: ${palette.gray.light2};
      border-color: ${palette.gray.light1};
    }
  `,
  [Theme.Dark]: css`
    button {
      background-color: ${palette.gray.dark4};
      border-color: ${palette.gray.dark3};
    }
  `,
};

export const selectStyles = css`
  > div {
    display: flex;
  }
`;
