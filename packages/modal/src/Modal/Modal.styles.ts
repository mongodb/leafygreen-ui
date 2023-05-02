import { transparentize } from 'polished';

import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  breakpoints,
  fontFamilies,
  transitionDuration,
} from '@leafygreen-ui/tokens';

import { CloseIconColor, ModalSize } from './Modal.types';

// breakpoints for different screen sizes
export const large = `${breakpoints.Desktop + 1}px`; // laptops/desktop screens, from 1025px and above

export const defaultHorizontalSpacing = 18;
export const defaultVerticalSpacing = 64;

export const backdropBaseStyle = css`
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity ${transitionDuration.default}ms ease-in-out;
`;

export const backdropThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${transparentize(0.4, palette.black)};
  `,
  [Theme.Dark]: css`
    background-color: ${transparentize(0.4, palette.gray.dark2)};
  `,
};

export const visibleBackdrop = css`
  opacity: 1;
`;

export const scrollContainer = css`
  position: absolute;
  min-height: 100%;
  width: 100%;
  padding: ${defaultVerticalSpacing}px ${defaultHorizontalSpacing}px;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const modalContentStyle = css`
  font-family: ${fontFamilies.default};
  transition: transform ${transitionDuration.default}ms ease-in-out,
    opacity ${transitionDuration.default}ms ease-in-out;
  margin: auto;
  max-height: calc(100% - ${defaultVerticalSpacing}px);
  position: relative;
  pointer-events: all;
  transform: translate3d(0, -16px, 0);
  opacity: 0;
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0px 8px 20px -8px ${transparentize(0.4, palette.black)};

  &:focus {
    outline: none;
  }
`;

export const modalThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
    background-color: ${palette.white};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
    background-color: ${palette.black};
  `,
};

export const visibleModalContentStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

export const modalSizes: Record<ModalSize, string> = {
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
