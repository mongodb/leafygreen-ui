import React from 'react';
import { Transition } from 'react-transition-group';

import { usePrefersReducedMotion } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { checkAnimationDuration } from '../constants';
import { CheckProps } from '../types';

import {
  checkIconStyles,
  checkIconTransitionStyles,
  disableAnimation,
  rippleBaseStyles,
  rippleCheckedStyles,
  rippleClassName,
  rippleThemeStyles,
  wrapperBaseStyle,
  wrapperCheckedBaseStyle,
  wrapperCheckedDisabledStyle,
  wrapperCheckedThemeStyle,
  wrapperDisabledStyle,
  wrapperThemeStyle,
} from './Check.style';
import SvgCheck from './SvgCheck';
import SvgIndeterminate from './SvgIndeterminate';

const checkIconColor: Record<Theme, Record<'default' | 'disabled', string>> = {
  [Theme.Light]: {
    default: palette.white,
    disabled: palette.gray.light3,
  },
  [Theme.Dark]: {
    default: palette.white,
    disabled: palette.gray.dark1,
  },
};

/**
 * @internal
 * @returns JSX.Element
 */
export function Check({
  theme,
  isChecked,
  indeterminate,
  disabled,
  animate,
  selector,
}: CheckProps) {
  const { usingKeyboard } = useUsingKeyboardContext();
  const prefersReducedMotion = usePrefersReducedMotion();

  const CheckSVG = indeterminate ? SvgIndeterminate : SvgCheck;
  const showCheckIcon = indeterminate || isChecked;
  const shouldAnimate = animate && !indeterminate && !prefersReducedMotion;

  return (
    <>
      <div
        className={cx(selector, wrapperBaseStyle, wrapperThemeStyle[theme], {
          [wrapperCheckedBaseStyle]: showCheckIcon,
          [wrapperCheckedThemeStyle[theme]]: showCheckIcon,
          [wrapperDisabledStyle[theme]]: disabled,
          [wrapperCheckedDisabledStyle[theme]]: disabled && showCheckIcon,
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
            <CheckSVG
              stroke={
                disabled
                  ? checkIconColor[theme].disabled
                  : checkIconColor[theme].default
              }
              className={cx(checkIconStyles, checkIconTransitionStyles[state], {
                [disableAnimation]: !shouldAnimate,
              })}
            />
          )}
        </Transition>
      </div>
      {!usingKeyboard && (
        <div
          className={cx(
            rippleClassName,
            rippleBaseStyles,
            rippleThemeStyles[theme],
            {
              [rippleCheckedStyles]: isChecked && shouldAnimate,
              [disableAnimation]: !shouldAnimate,
            },
          )}
        />
      )}
    </>
  );
}
