import React from 'react';
import { Transition, TransitionStatus } from 'react-transition-group';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import {
  checkAnimationDuration,
  checkBoxSize,
  flourishScale,
  flourishTransitionDelay,
  flourishTransitionScale,
  insetPct,
} from './constants';
import SvgCheck from './SvgCheck';
import SvgIndeterminate from './SvgIndeterminate';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { CheckProps } from './types';

const checkWrapperBaseStyle = css`
  --lg-checkbox-border-color: ${palette.gray.dark2};
  grid-area: check;
  position: relative;
  display: flex;
  z-index: 1;
  height: ${checkBoxSize}px;
  width: ${checkBoxSize}px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 2px solid var(--lg-checkbox-border-color);
  overflow: hidden;
  background-color: transparent;
  transition: box-shadow 100ms ease-in-out, background-color 0ms linear,
    border-color 0ms linear;

  // delay border-color out
  transition-delay: 0ms, 0ms, var(--lg-checkbox-base-duration);

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
    transition: transform var(--lg-checkbox-base-duration) ease-in-out;
    transition-delay: calc(var(--lg-checkbox-base-duration) / 2);
  }
`;

const checkWrapperCheckedStyle = css`
  --lg-checkbox-border-color: ${palette.blue.base};
  background-color: ${palette.blue.base};
  // Delay background transition in
  transition-delay: 0ms, var(--lg-checkbox-base-duration), 0ms;

  &:before {
    transform: scale(1);
    // No delay on enter
    transition-delay: 0ms;
  }
`;

const checkWrapperDisabledStyle = css`
  --lg-checkbox-border-color: ${palette.gray.light2};
  background-color: ${palette.gray.light3};
  box-shadow: unset;

  &:before {
    background-color: ${palette.gray.light3};
  }
`;

const checkWrapperCheckedDisabledStyle = css`
  background-color: var(--lg-checkbox-border-color);

  &:before {
    background-color: var(--lg-checkbox-border-color);
  }
`;

const flourishStyles = css`
  grid-area: check;
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

const flourishStylesChecked = css`
  // only animate flourish on enter
  transition-duration: calc(
    ${flourishTransitionScale} * var(--lg-checkbox-base-duration)
  );
  transition-delay: calc(
    ${flourishTransitionDelay} * var(--lg-checkbox-base-duration)
  );
  transform: scale(${flourishScale});
  opacity: 0;
`;

const checkIconStyles = css`
  z-index: 1;
  transform-origin: center;
  transition: transform var(--lg-checkbox-base-duration) ease-in-out;
`;

const checkInStyles = css`
  transform: scale(1) rotate(0);
  transition-delay: calc(var(--lg-checkbox-base-duration) / 8);
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

  const CheckIcon = indeterminate ? SvgIndeterminate : SvgCheck;
  const showCheckIcon = indeterminate || isChecked;
  const checkIconColor = disabled ? palette.gray.light3 : palette.white;

  const shouldAnimate = animate && !indeterminate;

  return (
    <>
      <div
        {...selector.prop}
        className={cx(checkWrapperBaseStyle, {
          [checkWrapperCheckedStyle]: showCheckIcon,
          [checkWrapperDisabledStyle]: disabled,
          [checkWrapperCheckedDisabledStyle]: disabled && showCheckIcon,
        })}
      >
        <Transition
          in={showCheckIcon}
          timeout={shouldAnimate ? checkAnimationDuration : 0}
        >
          {state => (
            <CheckIcon
              stroke={checkIconColor}
              className={cx(checkIconStyles, checkIconTransitionStyles[state])}
            />
          )}
        </Transition>
      </div>
      {!usingKeyboard && (
        <div
          className={cx(flourishStyles, {
            [flourishStylesChecked]: isChecked && shouldAnimate,
          })}
        />
      )}
    </>
  );
}
