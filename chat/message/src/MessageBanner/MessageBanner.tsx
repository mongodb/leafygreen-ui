import React, { useEffect, useRef, useState } from 'react';

import Banner from '@leafygreen-ui/banner';
import { cx } from '@leafygreen-ui/emotion';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

import { baseStyles, multilineStyles } from './MessageBanner.styles';
import { MessageBannerProps } from './MessageBanner.types';

export function MessageBanner({
  className,
  darkMode: darkModeProp,
  children,
  variant = 'info',
  ...divProps
}: MessageBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [isMultiline, setIsMultiline] = useState(false);
  const baseFontSize = useBaseFontSize();
  useEffect(() => {
    if (bannerRef.current) {
      const singleLineCutoff = baseFontSize === 14 ? 38 : 46;
      setIsMultiline(bannerRef.current.clientHeight > singleLineCutoff);
    }
  }, [children, baseFontSize]);
  return (
    <Banner
      ref={bannerRef}
      className={cx(baseStyles, { [multilineStyles]: isMultiline }, className)}
      variant={variant}
      {...divProps}
    >
      {children}
    </Banner>
  );
}

MessageBanner.displayName = 'MessageBanner';
