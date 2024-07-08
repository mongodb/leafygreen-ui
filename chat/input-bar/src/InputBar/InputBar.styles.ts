import { css } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import {
  BaseFontSize,
  focusRing,
  fontFamilies,
  fontWeights,
  spacing,
  transitionDuration,
  typeScales,
} from '@leafygreen-ui/tokens';

export const baseStyles = css`
  width: 100%;
  position: relative;
`;

export const contentWrapperStyles = css`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr auto;
  position: relative;
  border-radius: 8px;
  border: 1px solid ${palette.gray.base};
  z-index: 2;

  &:disabled {
    cursor: not-allowed;

    &:hover,
    &:active {
      box-shadow: none;
    }
  }
`;

export const contentWrapperFocusStyles = css`
  border-color: transparent;
`;

export const contentWrapperThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.black};
    color: ${palette.white};
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
    color: black;
  `,
};

export const leftContentStyles = css`
  display: flex;
  gap: ${spacing[2]}px;
  align-items: center;
  align-self: top;
  height: 36px; // hard set to height of textarea
  padding: ${spacing[1]}px 0px ${spacing[1]}px ${spacing[2]}px;
  background-color: inherit;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
`;

export const rightContentStyles = css`
  display: flex;
  align-items: flex-end;
  gap: ${spacing[2]}px;
  padding: ${spacing[1]}px;
  background-color: inherit;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
`;

export const inputStyles = css`
  flex: 1;
  font-size: ${BaseFontSize.Body1}px;
  font-family: ${fontFamilies.default};
  font-weight: ${fontWeights.regular};
  height: 36px;
  padding: ${spacing[2]}px;
  outline: none;
  border: none;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
  overflow-y: scroll;
  resize: none; // to remove bottom right diagonal lines
  box-sizing: content-box;
  line-height: ${typeScales.body1.lineHeight}px;
  max-height: 160px;
  background-color: inherit;
  color: inherit;
  margin: 0; // firefox creates margins on textareas - remove it for consistent sizing

  &:disabled {
    &::placeholder {
      color: inherit;
    }

    &:disabled:-webkit-autofill {
      &,
      &:hover,
      &:focus {
        appearance: none;
        -webkit-text-fill-color: ${palette.gray.base};
      }
    }
  }
`;

export const disabledThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    color: ${palette.gray.dark1};
    background-color: ${palette.gray.dark3};
    border-color: ${palette.gray.dark2};
  `,
  [Theme.Light]: css`
    color: ${palette.gray.base};
    background-color: ${palette.gray.light2};
    border-color: ${palette.gray.light1};
  `,
};

export const inputThemeStyles: Record<Theme, string> = {
  [Theme.Dark]: css`
    background-color: ${palette.black};
    color: ${palette.white};
    &:disabled {
      ${disabledThemeStyles[Theme.Dark]}
    }
  `,
  [Theme.Light]: css`
    background-color: ${palette.white};
    color: black;
    &:disabled {
      ${disabledThemeStyles[Theme.Light]}
    }
    &::placeholder {
      color: ${palette.gray.base};
    }
  `,
};

export const focusContainerStyles = css`
  border-radius: 8px;
`;

export const focusStyles = css`
  box-shadow: ${focusRing.light.input};
  border-color: transparent;
  transition: ${transitionDuration.default}ms ease-in-out;
  transition-property: border-color, box-shadow;
`;

const gradientWidth = 3;
const gradientOffset = 1;

export const gradientAnimationStyles = css`
  &:before,
  &:after {
    content: '';
    position: absolute;
    top: -${gradientWidth + gradientOffset}px;
    left: -${gradientWidth + gradientOffset}px;
    width: calc(100% + ${(gradientWidth + gradientOffset) * 2}px);
    height: calc(100% + ${(gradientWidth + gradientOffset) * 2}px);
    border-radius: 12px;
    background-color: ${palette.blue.light1};
    background-size: 400% 400%;
    background-position: 800% 800%; // set final state of animation
  }

  &:after {
    animation: 4s animateBg linear;
  }

  &:before {
    filter: blur(4px) opacity(0.6);
    animation: 4s animateBg, animateShadow linear infinite;
    opacity: 0;
  }

  @keyframes animateBg {
    0% {
      background-position: 400% 400%;
      background-image: linear-gradient(
        20deg,
        ${palette.blue.light1} 0%,
        ${palette.blue.light1} 30%,
        #00ede0 45%,
        #00ebc1 75%,
        #0498ec
      );
    }
    100% {
      background-position: 0% 0%;
      background-image: linear-gradient(
        20deg,
        ${palette.blue.light1} 0%,
        ${palette.blue.light1} 30%,
        #00ede0 45%,
        #00ebc1 75%,
        #0498ec
      );
    }
  }

  @keyframes animateShadow {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

export const sendButtonDisabledStyles = css`
  &:hover {
    box-shadow: none;
  }
`;

export const getIconFill = (theme: Theme, disabled?: boolean) => {
  if (theme === Theme.Dark) {
    if (disabled) {
      return palette.gray.dark1;
    } else {
      return palette.gray.light1;
    }
  } else {
    if (disabled) {
      return palette.gray.base;
    } else {
      return palette.gray.dark1;
    }
  }
};
