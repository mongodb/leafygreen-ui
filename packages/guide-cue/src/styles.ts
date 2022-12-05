import { transparentize } from 'polished';

import { css, cx } from '@leafygreen-ui/emotion';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

export const timeout1 = 400;
export const timeout2 = 100;

const size = 24;

export const tooltipMultistepStyles = css`
  padding: 32px 16px 16px;
`;

export const tooltipStyles = css`
  cursor: auto;
`;

export const beaconStyles = (
  prefersReducedMotion: boolean,
  darkMode: boolean,
) => {
  const color = darkMode ? palette.blue.light2 : palette.blue.base;

  const sharedCss = css`
    position: relative;

    div {
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${transparentize(0.5, color)};
      transform-origin: center;
      position: relative;
    }
  `;

  if (prefersReducedMotion) {
    return cx(
      sharedCss,
      css`
        div {
          box-shadow: 0px 0px 0px 4px ${transparentize(0.83, color)};
        }
      `,
    );
  }

  return cx(
    sharedCss,
    css`
      &::before,
      &::after {
        content: '';
        position: absolute;
        border-radius: 50%;
        translate: -50% -50%;
        top: 50%;
        left: 50%;
        scale: 0.9;
        opacity: 0;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, 0);
        box-shadow: 0px 0px 0px 0px ${transparentize(1, color)};
      }

      // inner most pulse ring
      &::before {
        animation: pulse-outer 2.3s infinite cubic-bezier(0.42, 0, 0.61, 0.69);
      }

      // outer mosts pulse ring
      &::after {
        animation: pulse-outer-2 2.3s infinite cubic-bezier(0.42, 0, 0.46, 0.72);
      }

      @keyframes pulse-outer {
        10% {
          box-shadow: 0px 0px 0px 0px ${transparentize(0.95, color)};
          opacity: 1;
        }

        40%,
        100% {
          // this should scale up to 1 and have 0 opacity by 42% and remain that way until 100%
          scale: 1;
          box-shadow: 0px 0px 0px 15px ${transparentize(0.7, color)};
          opacity: 0;
        }
      }

      @keyframes pulse-outer-2 {
        10% {
          box-shadow: 0px 0px 0px 0px ${transparentize(0.95, color)};
          opacity: 1;
        }

        35%,
        100% {
          // this should scale up to 1 and have 0 opacity by 35% and remain that way until 100%. This is 35% so that it gives the illusion of disappearing before the first ring.
          scale: 1;
          box-shadow: 0px 0px 0px 18px ${transparentize(0.7, color)};
          opacity: 0;
        }
      }

      div {
        animation: pulse-inner 2.3s infinite cubic-bezier(0.42, 0, 0.58, 0.72);

        @keyframes pulse-inner {
          40% {
            // at 0% this will start to slowly scale and by 40% this should scale to 1.3
            scale: 1.3;
          }
          73% {
            // By 73% this should scale back to 1. From 73% to 100% it will remain at 1.
            scale: 1;
          }
        }
      }
    `,
  );
};

export const contentStyles = css`
  margin-bottom: 16px;
`;

export const footerStyles = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 16px;
`;

export const bodyThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.light1};
  `,
  [Theme.Dark]: css`
    color: ${palette.black};
  `,
};

export const bodyTitleStyles = css`
  margin-bottom: 4px;
`;

export const closeStyles = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const closeHoverStyles = css`
  color: ${palette.gray.dark2};
  &:hover,
  &:active {
    &::before {
      background-color: ${palette.gray.light3};
    }
  }
`;

export const stepStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark2};
  `,
};

export const buttonStyles = css`
  height: 28px;
`;
