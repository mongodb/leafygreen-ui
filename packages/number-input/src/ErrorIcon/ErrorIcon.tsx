import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  iconBaseStyles,
  iconErrorAnimateStyles,
  iconErrorDisabledStyles,
  iconErrorStyles,
  iconSizeStyles,
  iconThemeStyles,
} from './ErrorIcon.styles';
import { ErrorIconProps } from './ErrorIcon.types';

/**
 * @internal
 */

export const ErrorIcon = ({
  disabled,
  size,
  renderErrorIcon,
}: ErrorIconProps) => {
  const { theme } = useDarkMode();

  return (
    <div
      className={cx(
        iconBaseStyles,
        iconThemeStyles[theme],
        iconSizeStyles[size],
        {
          [iconErrorStyles[size]]: renderErrorIcon,
          [iconErrorAnimateStyles[size]]: renderErrorIcon && !disabled,
          [iconErrorDisabledStyles]: disabled,
        },
      )}
    >
      <WarningIcon aria-hidden="true" />
    </div>
  );
};

ErrorIcon.displayName = 'ErrorIcon';
