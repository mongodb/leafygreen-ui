import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils';

import {
  getGalleryIndicatorStyles,
  getIndicatorStyles,
} from './GalleryIndicator.styles';
import { GalleryIndicatorProps } from './GalleryIndicator.types';

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
      'data-lgid': dataLgId,
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
        data-testid={lgIds.root}
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
