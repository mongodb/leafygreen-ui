import React from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import ErrorIcon from '@leafygreen-ui/icon/dist/X';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { State } from '../PasswordInput/PasswordInput.types';

import {
  baseStyles,
  iconBaseStyles,
  iconThemeStateStyles,
  themeStyles,
  wrapperStyles,
} from './StateNotifications.styles';
import { StateNotificationsProps } from './StateNotifications.types';

const icons: Record<
  State,
  React.ComponentType<React.PropsWithChildren<any>>
> = {
  [State.Error]: ErrorIcon,
  [State.Warning]: WarningIcon,
  [State.Valid]: CheckmarkIcon,
  [State.None]: CheckmarkIcon,
};

export const StateNotifications = ({
  id,
  notifications,
  ...rest
}: StateNotificationsProps) => {
  const { theme } = useDarkMode();

  return (
    // We're using aria-polite to announce when a message has changed. In order for aria-polite to work correctly the message wrapper needs to remain on the page even if there are no messages. If a custom message container is specified with aria-describedby then this wrapper will not render.
    <ul
      aria-live="polite"
      aria-relevant="all"
      className={wrapperStyles}
      id={id}
      {...rest}
    >
      {notifications.map((item, index) => {
        const { state, notification } = item;
        const ValidationIcon = icons[state];
        return (
          <li
            key={`${index}-${state}`}
            className={cx(baseStyles, themeStyles[theme][state])}
            aria-hidden={state === State.None}
          >
            <ValidationIcon
              className={cx(iconBaseStyles, iconThemeStateStyles[theme][state])}
              aria-hidden="true"
            />
            <VisuallyHidden>{`${state}`}</VisuallyHidden>
            <span>{notification}</span>
          </li>
        );
      })}
    </ul>
  );
};

StateNotifications.displayName = 'StateNotifications';
