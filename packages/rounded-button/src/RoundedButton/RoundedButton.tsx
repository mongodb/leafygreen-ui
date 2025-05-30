import React from 'react';

import { cx } from '@leafygreen-ui/emotion';

import { baseStyles } from './RoundedButton.styles';
import { RoundedButtonProps } from './RoundedButton.types';

export function RoundedButton({ children, className, ...props }: RoundedButtonProps) {
  return (
    <button
      {...props}
      className={cx(baseStyles, className)}
    >
      {children}
    </button>
  );
}

RoundedButton.displayName = 'RoundedButton';
