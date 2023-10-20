import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const disabledTableRowCheckStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    input + div {
      border-color: ${palette.gray.light1};
      background-color: ${palette.gray.light2};
    }
    input[aria-checked='true'] + div {
      &:before {
        background-color: ${palette.gray.light1};
      }
      & path {
        stroke: ${palette.white};
      }
    }
  `,
  [Theme.Dark]: css`
    input + div {
      border-color: ${palette.gray.dark1};
      background-color: ${palette.gray.dark2};
    }
    input[aria-checked='true'] + div {
      &:before {
        background-color: ${palette.gray.dark1};
      }
      & path {
        stroke: ${palette.gray.base};
      }
    }
  `,
};
