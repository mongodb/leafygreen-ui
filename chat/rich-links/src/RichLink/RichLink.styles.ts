import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const richLinkTextClassName = createUniqueClassName('lg-chat-rich-link');

export const baseStyles = css`
  box-shadow: none;
  padding: ${spacing[100]}px ${spacing[200]}px;
  border-radius: ${spacing[200]}px;
  text-decoration: none;
  min-height: initial;
  max-width: 100%;
  display: flex;
  align-items: center;
  gap: ${spacing[200]}px;

  & .${richLinkTextClassName} {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const themeStyles = {
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark4};

    &:hover {
      box-shadow: 0 0 0 3px ${palette.gray.dark2};
    }
  `,
  [Theme.Light]: css`
    background-color: ${palette.gray.light3};

    &:hover {
      box-shadow: 0 0 0 3px ${palette.gray.light2};
    }
  `,
};
