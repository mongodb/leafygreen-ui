import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  getGalleryIndicatorStyles,
  getIndicatorStyles,
} from './GalleryIndicator.styles';
import { GalleryIndicatorProps } from './GalleryIndicator.types';
import { DEFAULT_LGID_ROOT, getLgIds } from '../utils';

export const GalleryIndicator = React.forwardRef<
  HTMLUListElement,
  GalleryIndicatorProps
>(
  (
    {
      darkMode: darkModeProp,
      length,
      activeIndex,
      className,
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    }: GalleryIndicatorProps,
    forwardRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const lgIds = getLgIds(dataLgId);
    return (
      <ul
        ref={forwardRef}
        className={getGalleryIndicatorStyles({ className })}
        data-lgid={lgIds.root}
        {...rest}
      >
        {Array.from({ length: length }, (_, i) => {
          const isActive = i === activeIndex;

          return (
            <li
              key={i}
              data-testid={lgIds.indicator}
              data-lgid={lgIds.indicator}
              className={getIndicatorStyles({ theme, isActive })}
              data-active={isActive}
            />
          );
        })}
      </ul>
    );
  },
);

GalleryIndicator.displayName = 'GalleryIndicator';
