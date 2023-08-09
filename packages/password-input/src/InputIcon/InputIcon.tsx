import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import ErrorIcon from '@leafygreen-ui/icon/dist/X';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { State } from '../PasswordInput/PasswordInput.types';

import {
  baseStyles,
  disabledStyles,
  sizeStyles,
  themeStateStyles,
} from './InputIcon.styles';
import { InputIconProps, StateProps } from './InputIcon.types';

const validationIcons: Record<
  StateProps,
  React.ComponentType<React.PropsWithChildren<any>>
> = {
  [State.Error]: ErrorIcon,
  [State.Warning]: WarningIcon,
  [State.Valid]: CheckmarkIcon,
};

export const InputIcon = ({ state, size, disabled }: InputIconProps) => {
  const ValidationIcon = validationIcons[state];

  const { theme } = useDarkMode();

  return (
    <ValidationIcon
      className={cx(
        baseStyles,
        sizeStyles[size],
        themeStateStyles[theme][state],
        {
          [disabledStyles[theme]]: disabled,
        },
      )}
    />
  );
};

InputIcon.displayName = 'InputIcon';
