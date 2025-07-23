import { prefersReducedMotion } from '@leafygreen-ui/a11y';
import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

export const collapsibleBaseStyle = css`
  background-color: transparent;
  border: none;
  margin: 0px;
  transition: ${transitionDuration.faster}ms ease-in-out;
  transition-property: border-color, background-color, color;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const collapsibleThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-bottom: 1px solid ${palette.gray.light2};

    &:hover {
      background-color: ${palette.gray.light2};
      border-color: ${palette.green.dark1};
    }
  `,
  [Theme.Dark]: css`
    border-bottom: 1px solid ${palette.gray.dark1};

    &:hover {
      background-color: ${palette.gray.dark2};
      border-color: ${palette.green.base};
    }
  `,
};

export const collapsibleFocusThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    &:focus {
      color: ${palette.blue.dark2};
      border-color: ${palette.blue.base};
      background-color: ${palette.blue.light3};

      & svg {
        color: ${palette.blue.base};
      }
    }
  `,
  [Theme.Dark]: css`
    &:focus {
      color: ${palette.blue.light3};
      border-color: ${palette.blue.light1};
      background-color: ${palette.blue.dark3};

      & svg {
        color: ${palette.blue.light1};
      }
    }
  `,
};

export const expandIconStyle = css`
  transition: ${transitionDuration.default}ms all ease-in-out;
  margin-left: ${spacing[2]}px;

  ${prefersReducedMotion(`
    transition: none;
  `)}
`;

export const openExpandIconStyle = css`
  transform: rotate(90deg);
`;

export const collapsibleGroupBaseStyles = css`
  max-height: 0;
  overflow: hidden;
  opacity: 1;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: opacity, max-height;

  ${prefersReducedMotion(`
    transition: opacity ${transitionDuration.default}ms ease-in-out;
  `)}
`;

export const transitionStyles = {
  entering: css`
    opacity: 0;
  `,
  entered: '',
  exiting: css`
    opacity: 0;
  `,
  exited: css`
    opacity: 0;
  `,
  unmounted: undefined,
};

export const ulStyles = css`
  transition: opacity ${transitionDuration.default}ms ease-in-out;
  opacity: 0;
`;

export const ulTransitionStyles = css`
  opacity: 1;
`;
