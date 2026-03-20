import React, { forwardRef, useEffect, useRef, useState } from 'react';

import { Banner as LGBanner } from '@leafygreen-ui/banner';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import { useBaseFontSize } from '@leafygreen-ui/leafygreen-provider';

import { getBannerStyles } from './Banner.styles';
import { BannerProps } from './Banner.types';

export const Banner = forwardRef<HTMLDivElement, BannerProps>(
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
      <LGBanner
        ref={ref}
        className={getBannerStyles({
          className,
          isMultiline,
        })}
        variant={variant}
        {...divProps}
      >
        {children}
      </LGBanner>
    );
  },
);

Banner.displayName = 'Banner';
