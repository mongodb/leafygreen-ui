import React from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import {
  checkAnimationDuration,
  checkBoxSize,
  rippleScale,
  rippleTransitionDelay,
  rippleTransitionScale,
  insetPct,
} from './constants';
import SvgCheck from './SvgCheck';
import SvgIndeterminate from './SvgIndeterminate';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { CheckProps } from './types';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { usePrefersReducedMotion } from '@leafygreen-ui/a11y';

const rippleClassName = createUniqueClassName('ripple');
const checkBorderSizePx = 2;

const disableAnimation = css`
  &,
  &:before {
    transition: unset;
    transition-delay: 0ms;
    transition-duration: 0ms;
  }
`;

const checkWrapperBaseStyle = css`
  grid-area: check;
  position: relative;
  display: flex;
  z-index: 1;
  height: ${checkBoxSize}px;
  width: ${checkBoxSize}px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: ${checkBorderSizePx}px solid ${palette.gray.dark2};
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
    background-color: ${palette.blue.base};
    transform: scale(0);
    transform-origin: center center;
    transition: transform ${checkAnimationDuration}ms ease-in-out;
    transition-delay: ${checkAnimationDuration / 2}ms;
  }
`;

const checkWrapperCheckedStyle = css`
  background-color: ${palette.blue.base};
  border-color: ${palette.blue.base};
  // Delay background transition in
  transition-delay: 0ms, ${checkAnimationDuration}ms, 0ms;

  &:before {
    transform: scale(1);
    // No delay on enter
    transition-delay: 0ms;
  }
`;

const checkWrapperDisabledStyle = css`
  border-color: ${palette.gray.light2};
  background-color: ${palette.gray.light3};
  box-shadow: unset;

  &:before {
    background-color: ${palette.gray.light3};
  }
`;

const checkWrapperCheckedDisabledStyle = css`
  background-color: ${palette.gray.light2};

  &:before {
    background-color: ${palette.gray.light2};
  }
`;

const rippleStyles = css`
  grid-area: check;
  position: relative;
  top: ${checkBorderSizePx}px;
  height: ${checkBoxSize}px;
  width: ${checkBoxSize}px;
  z-index: 0;
  border-radius: 100%;
  background-color: ${palette.blue.dark1};
  opacity: 1;
  transform: scale(0);
  transform-origin: center center;
  transition: 0ms ease-in-out;
  transition-property: transform, opacity;
`;

const rippleStylesChecked = css`
  // only animate ripple on enter
  transition-duration: ${rippleTransitionScale * checkAnimationDuration}ms;
  transition-delay: ${rippleTransitionDelay * checkAnimationDuration}ms;
  transform: scale(${rippleScale});
  opacity: 0;
`;

const checkIconStyles = css`
  z-index: 1;
  transform-origin: center;
  transition: transform ${checkAnimationDuration}ms ease-in-out;
`;

const checkInStyles = css`
  transform: scale(1) rotate(0);
  transition-delay: ${checkAnimationDuration / 8}ms;
`;

const checkOutStyles = css`
  transform: scale(0) rotate(-45deg);
`;

const checkIconTransitionStyles: Record<TransitionStatus, string> = {
  entering: checkOutStyles,
  entered: checkInStyles,
  exiting: checkOutStyles,
  exited: checkOutStyles,
  unmounted: checkOutStyles,
};

export function Check({
  isChecked,
  indeterminate,
  disabled,
  animate,
  selector,
}: CheckProps) {
  const { usingKeyboard } = useUsingKeyboardContext();
  const prefersReducedMotion = usePrefersReducedMotion();

  const CheckIcon = indeterminate ? SvgIndeterminate : SvgCheck;
  const showCheckIcon = indeterminate || isChecked;
  const checkIconColor = disabled ? palette.gray.light3 : palette.white;
  const shouldAnimate = animate && !indeterminate && !prefersReducedMotion;

  return (
    <>
      <div
        className={cx(selector, checkWrapperBaseStyle, {
          [checkWrapperCheckedStyle]: showCheckIcon,
          [checkWrapperDisabledStyle]: disabled,
          [checkWrapperCheckedDisabledStyle]: disabled && showCheckIcon,
          [disableAnimation]: !shouldAnimate,
        })}
      >
        <Transition
          in={showCheckIcon}
          timeout={prefersReducedMotion ? 0 : checkAnimationDuration}
          enter={shouldAnimate}
          exit={shouldAnimate}
        >
          {state => (
            <CheckIcon
              stroke={checkIconColor}
              className={cx(checkIconStyles, checkIconTransitionStyles[state], {
                [disableAnimation]: !shouldAnimate,
              })}
            />
          )}
        </Transition>
      </div>
      {!usingKeyboard && (
        <div
          className={cx(rippleClassName, rippleStyles, {
            [rippleStylesChecked]: isChecked && shouldAnimate,
            [disableAnimation]: !shouldAnimate,
          })}
        />
      )}
    </>
  );
}
