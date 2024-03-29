import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing } from '@leafygreen-ui/tokens';

export const richLinkTextClassName = createUniqueClassName('lg-chat-rich-link');

export const baseStyles = css`
  box-shadow: none;
  padding: ${spacing[200]}px;
  border-radius: ${spacing[200]}px;
  text-decoration: none;
  min-height: ${spacing[900]}px;
  min-width: 100px;

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

export const badgeAreaStyles = css`
  padding-bottom: calc(18px + 2 * ${spacing[200]}px);
`;

export const imageBackgroundStyles = (imageUrl: string) => css`
  background: linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)),
    url(${imageUrl});
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;
  border-radius: ${spacing[200]}px;
  min-height: ${spacing[900]}px;

  & .${richLinkTextClassName} {
    color: ${palette.white};
  }
`;
