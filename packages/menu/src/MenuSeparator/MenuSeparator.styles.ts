import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const borderStyle = css`
  height: 16px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    height: 1px;
    width: 100%;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const borderThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &::before {
      background-color: ${palette.gray.dark2};
    }
  `,
  [Theme.Dark]: css`
    &::before {
      background-color: ${palette.gray.dark2};
    }
  `,
};
