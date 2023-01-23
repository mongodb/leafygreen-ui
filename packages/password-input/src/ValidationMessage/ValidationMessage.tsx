import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import ErrorIcon from '@leafygreen-ui/icon/dist/X';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { States } from '../PasswordInput/PasswordInput.types';

import {
  baseStyles,
  iconBaseStyles,
  iconThemeStateStyles,
  themeStyles,
} from './ValidationMessage.styles';
import { ValidationMessageProps } from './ValidationMessage.types';

const validationIcons: Record<States, React.ComponentType<any>> = {
  [States.Error]: ErrorIcon,
  [States.Warning]: WarningIcon,
  [States.Valid]: CheckmarkIcon,
  [States.None]: CheckmarkIcon,
};

export const ValidationMessage = ({
  message,
  state,
}: ValidationMessageProps) => {
  const ValidationIcon = validationIcons[state];

  const { theme } = useDarkMode();

  return (
    <li className={cx(baseStyles, themeStyles[theme][state])}>
      <ValidationIcon
        className={cx(iconBaseStyles, iconThemeStateStyles[theme][state])}
      />
      <span>{message}</span>
    </li>
  );
};

ValidationMessage.displayName = 'ValidationMessage';
