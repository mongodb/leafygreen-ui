import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { getTitleStyles, orderedListStyles } from './SectionNav.styles';
import { type SectionNavProps } from './SectionNav.types';
import { getLgIds } from '../utils/getLgIds';
import { SectionNavContextProvider } from '../Context/SectionNavContext';

export const SectionNav = forwardRef<HTMLElement, SectionNavProps>(
  (
    {
      children,
      title,
      darkMode: darkModeProp,
      'data-lgid': dataLgId,
      ...rest
    }: SectionNavProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const lgIds = getLgIds(dataLgId);

    return (
      <SectionNavContextProvider darkMode={darkMode} lgIds={lgIds} inContext>
        <nav
          data-lgid={lgIds.root}
          data-testid={lgIds.root}
          {...rest}
          ref={forwardedRef}
        >
          {title && (
            <Body
              data-lgid={lgIds.title}
              data-testid={lgIds.title}
              className={getTitleStyles({ theme })}
            >
              {title}
            </Body>
          )}
          <ol className={orderedListStyles}>{children}</ol>
        </nav>
      </SectionNavContextProvider>
    );
  },
);

SectionNav.displayName = 'SectionNav';
