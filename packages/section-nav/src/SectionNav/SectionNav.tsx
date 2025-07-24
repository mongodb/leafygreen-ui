import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { SectionNavContextProvider } from '../Context/SectionNavContext';
import { getLgIds } from '../utils/getLgIds';

import { getOrderedListStyles, getTitleStyles } from './SectionNav.styles';
import { type SectionNavProps } from './SectionNav.types';

/**
 * The Section Nav provides a page overview and direct access to specific sections. It is an ordered list of clickable headings corresponding to the content sections on the page. It allows users to navigate directly to any of the sections on the same page.
 */
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
      <SectionNavContextProvider darkMode={darkMode} lgIds={lgIds} hasContext>
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
              as="h2"
            >
              {title}
            </Body>
          )}
          <ol className={getOrderedListStyles({ theme })}>{children}</ol>
        </nav>
      </SectionNavContextProvider>
    );
  },
);

SectionNav.displayName = 'SectionNav';
