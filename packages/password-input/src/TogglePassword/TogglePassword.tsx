import React from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';

import { baseStyles, sizeStyles } from './TogglePassword.styles';
import { TogglePasswordProps } from './TogglePassword.types';

export const TogglePassword = ({
  showPassword,
  handleTogglePasswordClick,
  size,
}: TogglePasswordProps) => {
  const showPasswordIcon = showPassword ? 'Visibility' : 'VisibilityOff';

  return (
    <>
      <IconButton
        aria-label="Toggle password visibility"
        onClick={handleTogglePasswordClick}
        className={cx(baseStyles, sizeStyles[size])}
        role="switch"
        aria-checked={showPassword ? true : false}
      >
        <Icon aria-hidden={true} glyph={showPasswordIcon} />
      </IconButton>
      <VisuallyHidden aria-live="polite" id="password-text">
        {showPassword ? 'Password shown' : 'Password hidden'}
      </VisuallyHidden>
    </>
  );
};

TogglePassword.displayName = 'TogglePassword';
