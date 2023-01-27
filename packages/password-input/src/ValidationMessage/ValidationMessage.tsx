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
  wrapperStyles,
} from './ValidationMessage.styles';
import { ValidationMessageStateProps } from './ValidationMessage.types';

const validationIcons: Record<States, React.ComponentType<any>> = {
  [States.Error]: ErrorIcon,
  [States.Warning]: WarningIcon,
  [States.Valid]: CheckmarkIcon,
  [States.None]: CheckmarkIcon,
};

export const ValidationMessage = ({
  ariaDescribedby,
  messages,
}: ValidationMessageStateProps) => {
  const { theme } = useDarkMode();

  return (
    // We're using aria-polite to announce when a message has changed. In order for aria-polite to work correctly the message wrapper needs to remain on the page even if there are no messages. If a custom message container is specified with aria-describedby then this wrapper will not render.
    <ul aria-live="polite" className={wrapperStyles} id={ariaDescribedby}>
      {messages.map((item, index) => {
        const { state, message } = item;
        const ValidationIcon = validationIcons[state];
        return (
          <li key={index} className={cx(baseStyles, themeStyles[theme][state])}>
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
      })}
    </ul>
  );
};

ValidationMessage.displayName = 'ValidationMessage';
