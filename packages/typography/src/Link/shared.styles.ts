import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  fontFamilies,
  fontWeights,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { bodyTypeScaleStyles } from '../styles';

export const anchorClassName = createUniqueClassName();

export const linkStyles = css`
  font-family: ${fontFamilies.default};
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  text-decoration-color: transparent;
  cursor: pointer;
  font-size: inherit;
  line-height: inherit;

  &:hover,
  &:focus {
    text-decoration: underline;
    transition: text-decoration ${transitionDuration.default}ms ease-in-out;
    text-underline-offset: 4px;
    text-decoration-thickness: 2px;
  }

  &:focus {
    outline: none;
  }
`;

export const linkModeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.blue.base};
    font-weight: ${fontWeights.regular};

    &:hover {
      text-decoration-color: ${palette.gray.light2};
    }

    &:focus {
      text-decoration-color: ${palette.blue.base};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.blue.light1};
    font-weight: ${fontWeights.bold};

    &:hover {
      text-decoration-color: ${palette.gray.dark2};
    }

    &:focus {
      text-decoration-color: ${palette.blue.base};
    }
  `,
};

export const linkScaleStyles = (baseFontSize?: BaseFontSize) => {
  if (baseFontSize) {
    return bodyTypeScaleStyles[baseFontSize];
  }
};
