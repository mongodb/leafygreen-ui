import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

export const baseStyles = css`
  padding: 0;
  overflow: hidden;
  transition: ${transitionDuration.default}ms ease;

  //TODO: this is temp
  > div {
    max-height: inherit;
  }
`;

export const expandedContentStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};
  `,
};
