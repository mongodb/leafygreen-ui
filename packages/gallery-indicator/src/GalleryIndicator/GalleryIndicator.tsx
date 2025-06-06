import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDs } from '../constants';

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
      'data-lgid': dataLgId = LGIDs.root,
      ...rest
    }: GalleryIndicatorProps,
    forwardRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    return (
      <ul
        ref={forwardRef}
        className={getGalleryIndicatorStyles({ className })}
        data-lgid={dataLgId}
        {...rest}
      >
        {Array.from({ length: length }, (_, i) => {
          const isActive = i === activeIndex;

          return (
            <li
              key={i}
              data-testid={LGIDs.indicator}
              data-lgid={LGIDs.indicator}
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
