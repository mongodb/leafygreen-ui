import React from 'react';

import Banner from '@leafygreen-ui/banner';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { baseStyles, variantStyles } from './MessageBanner.styles';
import { MessageBannerProps } from './MessageBanner.types';

export function MessageBanner({
  darkMode: darkModeProp,
  children,
  variant = 'info',
}: MessageBannerProps) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <Banner
      className={cx(baseStyles, variantStyles[theme][variant])}
      variant={variant}
      baseFontSize={13}
    >
      {children}
    </Banner>
  );
}

MessageBanner.displayName = 'MessageBanner';
