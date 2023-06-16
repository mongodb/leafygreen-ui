import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  fontFamilies,
  fontWeights,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

export const sideNavItemClassName = createUniqueClassName('side-nav-item');

export const liStyle = css`
  width: 100%;
`;

// container styles
export const baseStyle = css`
  // Unset defaults
  margin: 0;
  appearance: none;
  background: none;
  border: none;
  cursor: pointer;

  // Layout
  position: relative;
  width: 100%;
  min-height: 32px;
  padding: 6px 16px;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  // Typography
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.regular};
  text-align: left;
  text-decoration: none;
  text-transform: capitalize;

  // Stateful transitions
  transition: background-color ${transitionDuration.faster}ms ease-in-out;

  &:hover {
    background-color: ${palette.gray.light2};
    text-decoration: none;
  }

  &:focus {
    text-decoration: none;
    outline: none;
  }

  &::-moz-focus-inner {
    border: 0;
  }

  // Setup the active/focus wedge
  &:before {
    content: '';
    position: absolute;
    background-color: transparent;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: ${spacing[1]}px;
    border-radius: 0 6px 6px 0;
    transition: transform ${transitionDuration.default}ms ease-in-out;
    transform: scaleY(0.3);
  }
`;

export const themeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};

    background-color: ${transparentize(100, palette.gray.light3)};

    &:hover {
      background-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};

    background-color: ${transparentize(100, palette.gray.light3)};

    &:hover {
      background-color: ${palette.gray.dark3};
    }
  `,
};

export const activeBaseStyle = css`
  cursor: default;
  font-weight: ${fontWeights.bold};
  text-decoration: none;

  // The active wedge
  &:before {
    transform: scaleY(1);
  }
`;

export const activeThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};

    &,
    &:hover {
      background-color: ${palette.green.light3};
    }

    &:before {
      background-color: ${palette.green.dark1};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.white};

    &,
    &:hover {
      background-color: ${palette.green.dark3};
    }

    &:before {
      background-color: ${palette.green.base};
    }
  `,
};

export const disabledStyle = css`
  background-color: transparent;
  font-weight: ${fontWeights.regular};
  cursor: not-allowed;

  &,
  &:hover {
    color: ${palette.gray.base};
    background-color: ${transparentize(100, palette.gray.light3)};
  }
`;

export const focusedStyle = css`
  position: relative;

  &:focus {
    text-decoration: none;

    // The focus wedge
    &:before {
      transform: scaleY(1);
    }
  }
`;

export const focusedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      color: ${palette.blue.dark2};
      background-color: ${palette.blue.light3};

      &:before {
        background-color: ${palette.blue.base};
      }
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      color: ${palette.blue.light3};
      background-color: ${palette.blue.dark3};

      &:before {
        background-color: ${palette.blue.light1};
      }
    }
  `,
};

export const focusedDisabledStyle = css`
  &:focus {
    &:before {
      content: unset;
    }
  }
`;

export const focusedDisabledThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      color: ${palette.blue.light1};
      background-color: ${transparentize(0.1, palette.blue.light3)};
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      color: ${palette.blue.light1};
      background-color: ${transparentize(0.1, palette.blue.dark3)};
    }
  `,
};

export const glyphWrapperStyle = css`
  margin-right: ${spacing[2]}px;
  display: inline-flex;
  align-items: center;
`;

export const nestedChildrenStyles = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const nestedUlStyle = css`
  list-style: none;
  padding-inline-start: 0;
`;
