import React from 'react';
import { MouseEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  notificationBarStyles,
  notificationBarThemeStyles,
} from './NotificationBar.styles';

/**
 * The button below a stack of >3 toasts
 * that allows users to expand the stack
 * @internal
 */
export const NotificationBar = ({
  count,
  onClick,
  className,
}: {
  count: number;
  onClick: MouseEventHandler;
  className?: string;
}) => {
  const { theme } = useDarkMode();

  // Don't render button if the count is 0.
  // Returning null instead of using mountOnEnter and unmountOnExit on <Transition /> because when using mountOnEnter and unmountOnExit the transitions don't work correctly.
  if (!count) return null;

  return (
    <button
      onClick={onClick}
      className={cx(
        notificationBarStyles,
        notificationBarThemeStyles[theme],
        className,
      )}
    >
      {count} more notification{count > 1 && 's'}
    </button>
  );
};
