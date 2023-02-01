import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

import { baseStyles, sizeStyles, srOnly } from './TogglePassword.styles';
import { TogglePasswordProps } from './TogglePassword.types';

export const TogglePassword = ({
  showPassword,
  disabled,
  handleTogglePasswordClick,
  sizeVariant,
}: TogglePasswordProps) => {
  const showPasswordIcon = showPassword ? 'Visibility' : 'VisibilityOff';

  return (
    <>
      <IconButton
        aria-label="Toggle password visibility"
        aria-disabled={disabled}
        disabled={disabled}
        onClick={handleTogglePasswordClick}
        className={cx(baseStyles, sizeStyles[sizeVariant])}
        role="switch"
        aria-checked={showPassword ? true : false}
      >
        <Icon aria-hidden={true} glyph={showPasswordIcon} />
      </IconButton>
      <p aria-live="polite" id="password-text" className={srOnly}>
        {showPassword ? 'Password shown' : 'Password hidden'}
      </p>
    </>
  );
};

TogglePassword.displayName = 'TogglePassword';
