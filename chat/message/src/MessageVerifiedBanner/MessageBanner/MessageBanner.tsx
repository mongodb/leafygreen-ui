import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { Banner } from '@leafygreen-ui/banner';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

import { getMessageBannerStyles } from './MessageBanner.styles';
import { MessageBannerProps } from './MessageBanner.types';

export const MessageBanner = forwardRef<HTMLDivElement, MessageBannerProps>(
  (
    {
      className,
      darkMode: darkModeProp,
      children,
      variant = 'info',
      ...divProps
    },
    fwdRef,
  ) => {
    const bannerRef = useRef<HTMLDivElement | null>(null);
    const ref = useMergeRefs([fwdRef, bannerRef]);
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
        ref={ref}
        className={getMessageBannerStyles({
          className,
          isMultiline,
        })}
        variant={variant}
        {...divProps}
      >
        {children}
      </Banner>
    );
  },
);

MessageBanner.displayName = 'MessageBanner';
