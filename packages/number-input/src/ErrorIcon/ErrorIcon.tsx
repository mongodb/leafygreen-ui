import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  animateStyles,
  disabledStyles,
  transitionStyle,
  translateStyles,
  wrapperBaseStyles,
  wrapperSizeStyles,
  wrapperThemeStyles,
} from './ErrorIcon.styles';
import { ErrorIconProps } from './ErrorIcon.types';

/**
 * @internal
 */

export const ErrorIcon = ({
  disabled,
  size,
  shouldRenderErrorIcon,
  shouldErrorTransition,
}: ErrorIconProps) => {
  const { theme } = useDarkMode();

  return (
    <div
      className={cx(
        wrapperBaseStyles,
        wrapperThemeStyles[theme],
        wrapperSizeStyles[size],
        {
          [translateStyles]: shouldRenderErrorIcon,
          [animateStyles[size]]: shouldRenderErrorIcon && !disabled,
          [transitionStyle]: shouldErrorTransition,
          [disabledStyles]: disabled,
        },
      )}
    >
      <WarningIcon aria-hidden="true" />
    </div>
  );
};

ErrorIcon.displayName = 'ErrorIcon';
