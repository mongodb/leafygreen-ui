import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const footerBaseStyle = css`
  min-height: 92px;
  width: 100%;
  padding: 26px 24px;
  display: flex;
  align-items: center;

  button {
    white-space: nowrap;
  }
`;

export const footerThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.white};
    box-shadow: 0px -1px 4px 0px ${transparentize(0.75, '#000000')};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.black};
    border-top: 1px solid ${palette.gray.dark2};
    box-shadow: 0px -1px 4px 0px ${transparentize(0.75, '#000000')};
  `,
};

export const contentStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const flexEndContent = css`
  margin-left: auto;
  display: inline-flex;
  align-items: center;
  gap: inherit;
`;

export const bannerStyle = css`
  flex-grow: 0;
  padding-block: 7px;
  max-width: 700px;
`;
