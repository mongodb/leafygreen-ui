import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  breakpoints,
  color,
  fontFamilies,
  spacing,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { ModalSize } from './Modal.types';

const getAnimationStyles = (theme: Theme) => css`
  &[open] {
    animation: fade-in ${transitionDuration.default}ms ease-out;
  }

  &[open]::backdrop {
    animation: backdrop-fade-in ${transitionDuration.default}ms ease-out
      forwards;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
      display: none;
    }

    100% {
      opacity: 1;
      display: block;
    }
  }

  @keyframes backdrop-fade-in {
    0% {
      background-color: rgb(0 0 0 / 0%);
    }

    100% {
      background-color: ${theme === Theme.Light
        ? transparentize(0.4, palette.black)
        : transparentize(0.4, palette.gray.dark2)};
    }
  }
`;

const getDialogContentStyle = (theme: Theme) => css`
  font-family: ${fontFamilies.default};
  pointer-events: all;
  border-radius: ${borderRadius[600]}px;
  padding: ${spacing[1000]}px ${spacing[900]}px;
  box-shadow: 0px 8px 20px -8px ${transparentize(0.4, palette.black)};
  border: none;
  position: relative;
  background-color: ${color[theme].background.primary.default};
  color: ${color[theme].text.primary.default};

  &:focus {
    outline: none;
  }
`;

// breakpoints for different screen sizes
const large = `${breakpoints.Desktop + 1}px`; // laptops/desktop screens, from 1025px and above

const sizeStyles: Record<ModalSize, string> = {
  small: css`
    width: 400px;
  `,

  default: css`
    width: 600px;
  `,

  large: css`
    width: 720px;

    @media only screen and (min-width: ${large}) {
      width: 960px;
    }
  `,
};

export const modalStyles = (theme: Theme, size: ModalSize) => {
  return cx(
    sizeStyles[size],
    getDialogContentStyle(theme),
    getAnimationStyles(theme),
  );
};
