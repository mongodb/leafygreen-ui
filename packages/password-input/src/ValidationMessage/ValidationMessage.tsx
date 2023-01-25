import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import ErrorIcon from '@leafygreen-ui/icon/dist/X';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { States } from '../PasswordInput/PasswordInput.types';
import { srOnly } from '../TogglePassword/TogglePassword.styles';

import {
  baseStyles,
  iconBaseStyles,
  iconThemeStateStyles,
  themeStyles,
} from './ValidationMessage.styles';
import { ValidationValidationStateProps } from './ValidationMessage.types';

const validationIcons: Record<States, React.ComponentType<any>> = {
  [States.Error]: ErrorIcon,
  [States.Warning]: WarningIcon,
  [States.Valid]: CheckmarkIcon,
  [States.None]: CheckmarkIcon,
};

export const ValidationMessage = ({
  message,
  state,
}: ValidationValidationStateProps) => {
  const ValidationIcon = validationIcons[state];

  const { theme } = useDarkMode();

  return (
    <li className={cx(baseStyles, themeStyles[theme][state])}>
      <ValidationIcon
        className={cx(iconBaseStyles, iconThemeStateStyles[theme][state])}
      />
      <span>{message}</span>
      <div className={srOnly}>
        {/* TODO: is this message clear enough for screen readers? */}
        {message}: {state}
      </div>
    </li>
  );
};

ValidationMessage.displayName = 'ValidationMessage';
