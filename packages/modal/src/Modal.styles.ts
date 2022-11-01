import { css } from "@leafygreen-ui/emotion";
import { Theme } from "@leafygreen-ui/lib";
import { palette, uiColors } from "@leafygreen-ui/palette";
import { fontFamilies } from "@leafygreen-ui/tokens";
import facepaint from "facepaint";
import { transparentize } from "polished";
import { CloseIconColor, ModalSize } from "./types";

// breakpoints for different screen sizes
export const small = '767px'; // mobile screens, from 0px - 767px
export const medium = '768px'; // tablet screens, from 768px - 1024px
export const large = '1025px'; // laptops/desktop screens, from 1025px and above

export const mq = facepaint([
  `@media only screen and (max-width: ${small})`,
  `@media only screen and (min-width: ${medium})`,
  `@media only screen and (min-width: ${large})`,
]);

export const defaultHorizontalSpacing = 18;
export const defaultVerticalSpacing = 64;

export const backdrop = css`
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0;
  transition: opacity 150ms ease-in-out;
`;

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
  transition: all 150ms ease-in-out;
  margin: auto;
  max-height: calc(100% - ${defaultVerticalSpacing}px);
  position: relative;
  pointer-events: all;
  transform: translate3d(0, -16px, 0);
  opacity: 0;

  &:focus {
    outline: none;
  }
`;

export const modeStyles = css`
  color: ${uiColors.gray.dark3};
  background-color: ${uiColors.white};
  font-family: ${fontFamilies.default};
  border-radius: 24px;
  padding: 40px 36px;
  box-shadow: 0px 8px 20px -8px ${transparentize(0.4, palette.black)};
`;

export const visibleModalContentStyle = css`
  transform: translate3d(0, 0, 0);
  opacity: 1;
`;

export const modalSizes: { readonly [K in ModalSize]: string } = {
  small: css`
    width: 400px;
  `,

  default: css`
    width: 600px;
  `,

  large: css`
    ${mq({
      width: ['720px', '720px', '960px'],
    })}
  `,
};

export const baseCloseButtonStyles = css`
  position: absolute;
  cursor: pointer;
`;

export const closeButton: Record<
  Theme,
  Record<CloseIconColor, string> & Record<'position', string>
> = {
  [Theme.Light]: {
    [CloseIconColor.Default]: css`
      color: ${palette.gray.base};
    `,
    [CloseIconColor.Dark]: css`
      color: ${palette.gray.dark1};
    `,
    [CloseIconColor.Light]: css`
      color: ${palette.white};
    `,
    position: css`
      // x-icon should be 24px from edge. IconButton is 28x28 and Icon is 16x16
      // so there's already (28 - 16) / 2 = 6px of spacing. 24 - 6 = 18.
      right: 18px;
      top: 18px;
    `,
  },
  [Theme.Dark]: {
    [CloseIconColor.Default]: css`
      color: ${uiColors.gray.base};

      &:hover {
        color: ${uiColors.gray.base};
      }
    `,
    [CloseIconColor.Dark]: css`
      color: ${uiColors.gray.base};

      &:hover {
        color: ${uiColors.gray.base};
      }
    `,
    [CloseIconColor.Light]: css`
      color: ${uiColors.gray.base};

      &:hover {
        color: ${uiColors.gray.base};
      }
    `,
    position: css`
      // x-icon should be 16px from edge. IconButton is 28x28 and Icon is 16x16
      // so there's already (28 - 16) / 2 = 6px of spacing. 16 - 6 = 10.
      right: 10px;
      top: 10px;
    `,
  },
};