import React from 'react';
import { MouseEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  notificationBarStyles,
  notificationBarThemeStyles,
} from './NotificationBar.styles';

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
