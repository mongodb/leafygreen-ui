import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { baseStyles, variantStyles } from './MessageContainer.styles';
import { MessageContainerProps } from './MessageContainer.types';
import { Variant } from '.';

export function MessageContainer({
  children,
  className,
  variant = Variant.Primary,
  darkMode: darkModeProp,
  ...rest
}: MessageContainerProps) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <div
      className={cx(baseStyles, variantStyles[variant][theme], className)}
      {...rest}
    >
      {children}
    </div>
  );
}

MessageContainer.displayName = 'MessageContainer';
