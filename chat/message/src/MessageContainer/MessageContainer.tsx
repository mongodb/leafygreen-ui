import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getMessageContainerStyles } from './MessageContainer.styles';
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
      className={getMessageContainerStyles({
        className,
        theme,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

MessageContainer.displayName = 'MessageContainer';
