import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies } from '@leafygreen-ui/tokens';

export const inlineKeyCodeStyles = css`
  font-family: ${fontFamilies.code};
  border: 1px solid;
  border-radius: 3px;
  padding-left: 5px;
  padding-right: 5px;
`;

export const inlineKeyCodeColor: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    border-color: ${palette.gray.dark3};
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
    border-color: ${palette.gray.base};
    background-color: ${palette.gray.dark3};
  `,
};
