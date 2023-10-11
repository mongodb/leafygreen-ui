import React from 'react';
import { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent, HTMLElementProps } from '@leafygreen-ui/lib';

import {
  baseQuickRangeButtonStyles,
  baseQuickRangeButtonThemeStyles,
} from './QuickRangeButton.styles';

export const QuickRangeButton = forwardRef<
  HTMLButtonElement,
  HTMLElementProps<'button'>
>(({ children, className, ...rest }, fwdRef) => {
  const { theme } = useDarkMode();
  return (
    <button
      ref={fwdRef}
      data-lg="date-range-picker-quick-range-button"
      className={cx(
        baseQuickRangeButtonStyles,
        baseQuickRangeButtonThemeStyles[theme],
        className,
      )}
      aria-label={getNodeTextContent(children)}
      {...rest}
    >
      {children}
    </button>
  );
});

QuickRangeButton.displayName = 'QuickRangeButton';
