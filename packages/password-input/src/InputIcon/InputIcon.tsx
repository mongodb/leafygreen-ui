import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import ErrorIcon from '@leafygreen-ui/icon/dist/X';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { States } from '../PasswordInput/PasswordInput.types';

import { baseStyles, sizeStyles, themeStateStyles } from './InputIcon.styles';
import { InputIconProps, StateProps } from './InputIcon.types';

const validationIcons: Record<StateProps, React.ComponentType<any>> = {
  [States.Error]: ErrorIcon,
  [States.Warning]: WarningIcon,
  [States.Valid]: CheckmarkIcon,
};

export const InputIcon = ({ state, sizeVariant }: InputIconProps) => {
  const ValidationIcon = validationIcons[state];

  const { theme } = useDarkMode();

  return (
    <ValidationIcon
      className={cx(
        baseStyles,
        sizeStyles[sizeVariant],
        themeStateStyles[theme][state],
      )}
    />
  );
};

InputIcon.displayName = 'InputIcon';
