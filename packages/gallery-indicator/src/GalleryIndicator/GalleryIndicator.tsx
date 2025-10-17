import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils';

import {
  getGalleryIndicatorStyles,
  getIndicatorStyles,
} from './GalleryIndicator.styles';
import { GalleryIndicatorProps, Variant } from './GalleryIndicator.types';

/**
 * GalleryIndicator is a component that displays a series of dots to indicate the current active index in a gallery.
 */
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
      variant = Variant.Default,
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
              className={getIndicatorStyles({ theme, isActive, variant })}
              data-active={isActive}
            />
          );
        })}
      </ul>
    );
  },
);

GalleryIndicator.displayName = 'GalleryIndicator';
