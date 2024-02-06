import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  fontWeights,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { bodyTypeScaleStyles } from '../styles';

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
  font-size: inherit;
  line-height: inherit;
  gap: ${spacing[0]}px;

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
    transition: background-color ${transitionDuration.default}ms ease-in-out;
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

export const linkScaleStyles = (baseFontSize?: BaseFontSize) => {
  if (baseFontSize) {
    return bodyTypeScaleStyles[baseFontSize];
  }
};
