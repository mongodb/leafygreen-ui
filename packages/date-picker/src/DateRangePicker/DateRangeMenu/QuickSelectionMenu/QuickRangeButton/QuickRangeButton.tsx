import React from 'react';
import { forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getNodeTextContent, HTMLElementProps } from '@leafygreen-ui/lib';

import {
  baseQuickRangeButtonStyles,
  baseQuickRangeButtonThemeStyles,
} from './QuickRangeButton.styles';

interface QuickRangeButtonProps
  extends Omit<HTMLElementProps<'button'>, 'children'> {
  label: string;
}

export const QuickRangeButton = forwardRef<
  HTMLButtonElement,
  QuickRangeButtonProps
>(({ label, className, ...rest }, fwdRef) => {
  const { theme } = useDarkMode();
  return (
    <button
      ref={fwdRef}
      data-lg="date-range_menu_quick-range-button"
      className={cx(
        baseQuickRangeButtonStyles,
        baseQuickRangeButtonThemeStyles[theme],
        className,
      )}
      aria-label={getNodeTextContent(label)}
      {...rest}
    >
      {label}
    </button>
  );
});

QuickRangeButton.displayName = 'QuickRangeButton';
