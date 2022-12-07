import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { focusRing, spacing, transitionDuration } from '@leafygreen-ui/tokens';
import { transparentize } from 'polished';

export const iconClassName = createUniqueClassName('collapse-menu');

export const buttonBaseStyles = css`
  position: absolute;
  bottom: ${spacing[3]}px;
  right: -${spacing[3]}px;
  width: ${spacing[5]}px;
  height: ${spacing[5]}px;

  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;

  cursor: pointer;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: color, border-color, box-shadow;

  &:hover {
    .${iconClassName} {
      transform: translate3d(-2px, 0, 0);
    }
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    border-color: transparent;
  }

  &::-moz-focus-inner {
    border: 0;
  }
`;

export const buttonThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.green.dark2};
    box-shadow: 0 3px 4px ${transparentize(0.9, palette.black)};
    background-color: ${palette.white};
    border: 1px solid ${palette.gray.light2};

    &:hover {
      background-color: ${palette.gray.light3};
      box-shadow: 0 2px 2px ${transparentize(0.8, palette.black)};
    }

    &:focus-visible {
      color: ${palette.blue.base};
      box-shadow: ${focusRing.light.default};
      background-color: ${palette.gray.light3};
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
    box-shadow: 0 3px 4px ${transparentize(0.9, palette.black)};
    background-color: ${palette.gray.dark4};
    border: 1px solid ${palette.gray.dark2};

    &:hover {
      background-color: ${palette.gray.dark2};
      box-shadow: 0 2px 2px ${transparentize(0.8, palette.black)};
    }

    &:focus-visible {
      color: ${palette.blue.light2};
      box-shadow: ${focusRing.dark.default};
      background-color: ${palette.gray.dark2};
    }
  `,
};

export const buttonCollapsedStyles = css`
  &:hover {
    .${iconClassName} {
      transform: translate3d(2px, 0, 0);
    }
  }
`;

export const iconWrapper = css`
  transition: transform 80ms ease-in-out;
  display: inline-block;
  height: 16px;

  ${prefersReducedMotion(`
    transition-property: unset;
  `)}
`;

export const keyboardShortcut = css`
  padding: 0 3px 2px 2px;
  line-height: 1em;
  margin-left: ${spacing[2]}px;
`;
