import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const rootMenuStyle = css`
  width: 210px;
  border-radius: 12px;
  overflow: auto;
  padding: 14px 0;
`;

export const rootMenuThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.black};
    border: 1px solid ${palette.black};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark3};
    border: 1px solid ${palette.gray.dark2};
  `,
};

export const scrollContainerStyle = css`
  overflow: auto;
  list-style: none;
  margin-block-start: 0px;
  margin-block-end: 0px;
  padding-inline-start: 0px;
  padding: 0px;
`;
