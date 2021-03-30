import { css } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';

export const removePointerEvents = css`
  pointer-events: none;
`;

export const textLoadingStyle = css`
  color: ${uiColors.gray.base};
  pointer-events: none;
  font-weight: unset;
`;

export const iconLoadingStyle = css`
  color: ${uiColors.gray.light2};
`;

export const anchorOverrides = css`
  a:focus,
  a:hover,
  a:visited,
  a:active,
  a:link {
    text-decoration: none;
    cursor: pointer;
  }
`;
