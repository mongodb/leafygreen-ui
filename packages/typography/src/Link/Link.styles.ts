import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { fontFamilies, fontWeights } from '@leafygreen-ui/tokens';

export const anchorClassName = createUniqueClassName();

export const overwriteDefaultStyles = css`
  &:hover,
  &:focus,
  &:visited {
    text-decoration: none;
  }
`;

export const linkStyles = css`
  font-family: ${fontFamilies.default};
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  line-height: 13px;

  &:focus {
    outline: none;
  }
`;

export const linkModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.base};
    font-weight: ${fontWeights.regular};
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light1};
    font-weight: ${fontWeights.bold};
  `,
};

export const underlineStyles = css`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -4px;
    left: 0;
    border-radius: 2px;
  }

  .${anchorClassName}:focus & {
    &::after {
      background-color: ${palette.blue.light1};
    }
  }
`;

export const underlineModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    .${anchorClassName}:hover & {
      &::after {
        background-color: ${palette.gray.light2};
      }
    }
  `,
  [Theme.Dark]: css`
    .${anchorClassName}:hover & {
      &::after {
        background-color: ${palette.gray.dark2};
      }
    }
  `,
};

export const arrowRightIconPersist = css`
  transform: translate3d(3px, 0, 0);
`;

export const arrowRightIconHover = css`
  opacity: 0;
  transform: translate3d(-3px, 0, 0);
  transition: all 100ms ease-in;

  .${anchorClassName}:hover & {
    opacity: 1;
    transform: translate3d(3px, 0, 0);
  }
`;

export const openInNewTabStyles = css`
  position: relative;
  bottom: 4px;
  left: -1px;
  height: 12px;
`;
