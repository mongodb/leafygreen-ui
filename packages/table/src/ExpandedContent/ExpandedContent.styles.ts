import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const expandedContentStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
};

export const subRowStyles = css`
  transition: all 0.2s ease-in;
`;

export const hiddenSubRowStyles = css`
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  opacity: 0;
  margin: 0;
`;
