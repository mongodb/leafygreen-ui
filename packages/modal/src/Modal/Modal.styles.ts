import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  borderRadius,
  breakpoints,
  color,
  fontFamilies,
  InteractionState,
  spacing,
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';
import { boxShadows } from '@leafygreen-ui/tokens';

import { ModalSize } from './Modal.types';

const LARGE_SIZE_BREAKPOINT = `${breakpoints.Desktop + 1}px`;
const TRANSITION_DURATION = transitionDuration.default;

const baseBackdropStyles = (theme: Theme) => {
  const darkMode = theme === Theme.Dark;
  return css`
    &::backdrop {
      background-color: ${transparentize(
        0.4,
        darkMode ? palette.gray.dark2 : palette.black,
      )};
      transition: opacity ${TRANSITION_DURATION}ms ease-in-out;
      opacity: 0;
    }

    &[open]::backdrop {
      opacity: 1;
    }

    @starting-style {
      &[open]::backdrop {
        opacity: 0;
      }
    }
  `;
};

const getBackdropStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(baseBackdropStyles(theme), className);

const getBaseDialogStyles = (theme: Theme) => css`
  border: none;
  border-radius: ${borderRadius[600]}px;
  box-shadow: ${boxShadows[theme][3]};
  background-color: ${color[theme].background[Variant.Primary][
    InteractionState.Default
  ]};
  padding: ${spacing[1000]}px ${spacing[900]}px;
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};
  font-family: ${fontFamilies.default};

  transition: opacity ${TRANSITION_DURATION}ms ease-in-out,
    overlay ${TRANSITION_DURATION}ms allow-discrete,
    display ${TRANSITION_DURATION}ms allow-discrete;
  opacity: 0;

  &[open] {
    position: fixed;
    opacity: 1;
  }

  @starting-style {
    &[open] {
      opacity: 0;
    }
  }

  &:focus {
    outline: none;
  }
`;

const dialogSizeStyles: Record<ModalSize, string> = {
  [ModalSize.Small]: css`
    width: 400px;
  `,

  [ModalSize.Default]: css`
    width: 600px;
  `,

  [ModalSize.Large]: css`
    width: 720px;

    @media only screen and (min-width: ${LARGE_SIZE_BREAKPOINT}) {
      width: 960px;
    }
  `,
};

const getRootDialogStyles = ({
  className,
  size,
  theme,
}: {
  className?: string;
  size: ModalSize;
  theme: Theme;
}) => cx(getBaseDialogStyles(theme), dialogSizeStyles[size], className);

export const getDialogStyles = ({
  backdropClassName,
  className,
  size,
  theme,
}: {
  backdropClassName?: string;
  className?: string;
  size: ModalSize;
  theme: Theme;
}) =>
  cx(
    getBackdropStyles({
      className: backdropClassName,
      theme,
    }),
    getRootDialogStyles({
      className,
      size,
      theme,
    }),
  );

export const portalContainerStyles = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
`;
