import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS } from '../constants';

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
      count,
      activeIndex,
      className,
      'data-lgid': dataLgId = LGIDS.root,
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
        {Array.from({ length: count }, (_, i) => {
          const isActive = i === activeIndex;

          return (
            <li
              key={i}
              data-testid={LGIDS.indicator}
              data-lgid={LGIDS.indicator}
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
