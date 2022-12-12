import { TransitionStatus } from 'react-transition-group';

import { css } from '@leafygreen-ui/emotion';
import { createUniqueClassName, Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import {
  checkAnimationDuration,
  checkBoxSize,
  insetPct,
  rippleScale,
  rippleTransitionDelay,
  rippleTransitionScale,
} from '../constants';

export const rippleClassName = createUniqueClassName('ripple');
export const checkBorderSizePx = 2;

export const disableAnimation = css`
  &,
  &:before {
    transition: unset;
    transition-delay: 0ms;
    transition-duration: 0ms;
  }
`;

export const wrapperBaseStyle = css`
  grid-area: check;
  position: relative;
  display: flex;
  z-index: 1;
  height: ${checkBoxSize}px;
  width: ${checkBoxSize}px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: ${checkBorderSizePx}px solid;
  overflow: hidden;
  background-color: transparent;
  transition: box-shadow 100ms ease-in-out, background-color 0ms linear,
    border-color 0ms linear;

  // delay border-color out
  transition-delay: 0ms, 0ms, ${checkAnimationDuration}ms;

  /**
   * The animated background circle
   */
  &:before {
    content: '';
    position: absolute;
    inset: ${insetPct}%;
    z-index: 1;
    border-radius: 100%;
    transform: scale(0);
    transform-origin: center center;
    transition: transform ${checkAnimationDuration}ms ease-in-out;
    transition-delay: ${checkAnimationDuration / 2}ms;
  }
`;

export const wrapperThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${palette.gray.dark2};

    &:before {
      background-color: ${palette.blue.base};
    }
  `,
  [Theme.Dark]: css`
    border-color: ${palette.gray.base};

    &:before {
      background-color: ${palette.blue.light1};
    }
  `,
};

export const wrapperCheckedBaseStyle = css`
  // Delay background transition in
  transition-delay: 0ms, ${checkAnimationDuration}ms, 0ms;

  &:before {
    transform: scale(1);
    // No delay on enter
    transition-delay: 0ms;
  }
`;

export const wrapperCheckedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.blue.base};
    border-color: ${palette.blue.base};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.blue.light1};
    border-color: ${palette.blue.light1};
  `,
};

export const wrapperDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    border-color: ${palette.gray.light2};
    background-color: ${palette.gray.light3};
    box-shadow: unset;

    &:before {
      background-color: ${palette.gray.light3};
    }
  `,

  [Theme.Dark]: css`
    border-color: ${palette.gray.dark2};
    background-color: ${palette.gray.dark3};
    box-shadow: unset;

    &:before {
      background-color: ${palette.gray.dark3};
    }
  `,
};

export const wrapperCheckedDisabledStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.gray.light2};

    &:before {
      background-color: ${palette.gray.light2};
    }
  `,
  [Theme.Dark]: css`
    background-color: ${palette.gray.dark2};

    &:before {
      background-color: ${palette.gray.dark2};
    }
  `,
};

export const rippleBaseStyles = css`
  grid-area: check;
  position: relative;
  top: ${checkBorderSizePx}px;
  height: ${checkBoxSize}px;
  width: ${checkBoxSize}px;
  z-index: 0;
  border-radius: 100%;
  opacity: 1;
  transform: scale(0);
  transform-origin: center center;
  transition: 0ms ease-in-out;
  transition-property: transform, opacity;
`;

export const rippleThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    background-color: ${palette.blue.dark1};
  `,
  [Theme.Dark]: css`
    background-color: ${palette.blue.light2};
  `,
};

export const rippleCheckedStyles = css`
  // only animate ripple on enter
  transition-duration: ${rippleTransitionScale * checkAnimationDuration}ms;
  transition-delay: ${rippleTransitionDelay * checkAnimationDuration}ms;
  transform: scale(${rippleScale});
  opacity: 0;
`;

export const checkIconStyles = css`
  z-index: 1;
  transform-origin: center;
  transition: transform ${checkAnimationDuration}ms ease-in-out;
`;

export const checkInStyles = css`
  transform: scale(1) rotate(0);
  transition-delay: ${checkAnimationDuration / 8}ms;
`;

export const checkOutStyles = css`
  transform: scale(0) rotate(-45deg);
`;

export const checkIconTransitionStyles: Record<TransitionStatus, string> = {
  entering: checkOutStyles,
  entered: checkInStyles,
  exiting: checkOutStyles,
  exited: checkOutStyles,
  unmounted: checkOutStyles,
};
