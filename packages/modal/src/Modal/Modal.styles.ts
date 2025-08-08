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
  transitionDuration,
  Variant,
} from '@leafygreen-ui/tokens';

import { CloseIconColor, ModalSize } from './Modal.types';

const DEFAULT_HORIZONTAL_SPACING = 18;
const DEFAULT_VERTICAL_SPACING = 64;
const LARGE_SIZE_BREAKPOINT = `${breakpoints.Desktop + 1}px`;
const TRANSITION_DURATION = transitionDuration.default;

const baseBackdropStyles = (theme: Theme) => {
  const darkMode = theme === Theme.Dark;
  return css`
    &::backdrop {
      background-color: ${transparentize(0.4, darkMode ? palette.gray.dark2 : palette.black)};
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
}

const getBackdropStyles = ({
  className,
  theme,
}: {
  className?: string;
  theme: Theme;
}) => cx(
  baseBackdropStyles(theme),
  className,
);

const getBaseDialogStyles = (theme: Theme) => css`
  background-color: ${color[theme].background[Variant.Primary][InteractionState.Default]};
  color: ${color[theme].text[Variant.Primary][InteractionState.Default]};
  font-family: ${fontFamilies.default};
  border: none;
  border-radius: ${borderRadius[600]}px;
  padding: 40px 36px;
  margin: auto;
  max-height: calc(100% - ${DEFAULT_VERTICAL_SPACING}px);
  position: relative;
  box-shadow: 0px 8px 20px -8px ${transparentize(0.4, palette.black)};

    /* Animation setup */
  opacity: 0;
  transform: scale(0.95);
  transition:
    opacity ${TRANSITION_DURATION}ms ease-in-out,
    transform ${TRANSITION_DURATION}ms ease-in-out,
    overlay ${TRANSITION_DURATION}ms allow-discrete,
    display ${TRANSITION_DURATION}ms allow-discrete;

  &:focus {
    outline: none;
  }

  &[open] {
    position: fixed;
    opacity: 1;
    transform: scale(1);
  }

  @starting-style {
    &[open] {
      opacity: 0;
      transform: scale(0.95);
    }
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
}) => cx(
  getBaseDialogStyles(theme),
  dialogSizeStyles[size],
  className,
);

export const getDialogStyles = ({
  backdropClassName,
  className,
  size,
  theme,
}: {
  /* @deprecated */
  backdropClassName?: string;
  className?: string;
  size: ModalSize;
  theme: Theme;
}) => cx(
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

export const baseCloseButtonStyles = css`
  position: absolute;
  cursor: pointer;
  // x-icon should be 24px from edge. IconButton is 28x28 and Icon is 16x16
  // so there's already (28 - 16) / 2 = 6px of spacing. 24 - 6 = 18.
  right: 18px;
  top: 18px;
`;

export const closeButton: Record<Theme, Record<CloseIconColor, string>> = {
  [Theme.Light]: {
    [CloseIconColor.Default]: css`
      color: ${palette.gray.dark1};
    `,
    [CloseIconColor.Dark]: css`
      color: ${palette.black};
    `,
    [CloseIconColor.Light]: css`
      color: ${palette.gray.light2};
    `,
  },
  [Theme.Dark]: {
    [CloseIconColor.Default]: css`
      color: ${palette.gray.base};
    `,
    [CloseIconColor.Dark]: css`
      color: ${palette.black};
    `,
    [CloseIconColor.Light]: css`
      color: ${palette.gray.light2};
    `,
  },
};
