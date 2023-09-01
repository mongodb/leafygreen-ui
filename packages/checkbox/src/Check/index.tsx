import React, { useRef } from 'react';
import { Transition } from 'react-transition-group';

import { usePrefersReducedMotion } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import { useComponentContext } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';

import { checkAnimationDuration } from '../constants';
import { CheckProps } from '../types';

import {
  checkIconStyles,
  checkIconTransitionStyles,
  disableAnimation,
  disabledTableRowStyles,
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
  const prefersReducedMotion = usePrefersReducedMotion();
  const { contextComponent, componentProps } = useComponentContext();
  const isInDisabledTableRow =
    contextComponent === 'lgTableRow' &&
    componentProps &&
    componentProps.disabled;

  const CheckSVG = indeterminate ? SvgIndeterminate : SvgCheck;
  const showCheckIcon = indeterminate || isChecked;
  const shouldAnimate = animate && !indeterminate && !prefersReducedMotion;

  const transitionRef = useRef<HTMLElement | null>(null);

  return (
    <>
      <div
        className={cx(selector, wrapperBaseStyle, wrapperThemeStyle[theme], {
          [wrapperCheckedBaseStyle]: showCheckIcon,
          [wrapperCheckedThemeStyle[theme]]: showCheckIcon,
          [wrapperDisabledStyle[theme]]: disabled,
          [wrapperCheckedDisabledStyle[theme]]: disabled && showCheckIcon,
          [disableAnimation]: !shouldAnimate,
          [disabledTableRowStyles[theme]]: isInDisabledTableRow,
        })}
      >
        <Transition
          in={showCheckIcon}
          timeout={prefersReducedMotion ? 0 : checkAnimationDuration}
          enter={shouldAnimate}
          exit={shouldAnimate}
          nodeRef={transitionRef}
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
    </>
  );
}
