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
  a {
    &:focus,
    &:hover,
    &:visited,
    &:active,
    &:link {
      text-decoration: none;
      cursor: auto;
    }
  }
`;

export const orgNavAnchorOverrides = css`
  a {
    &:visited,
    &:active,
    &:link {
      color: ${uiColors.gray.dark3};
    }
  }
`;

export const projectNavAnchorOverrides = css`
  a {
    &:visited,
    &:active,
    &:link {
      color: ${uiColors.gray.dark2};
    }
  }
`;
