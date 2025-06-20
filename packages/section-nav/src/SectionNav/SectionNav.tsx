import React, { forwardRef } from 'react';

import { Body } from '@leafygreen-ui/typography';

import { type SectionNavProps } from './SectionNav.types';
import { orderedListStyles } from './SectionNav.styles';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

export const SectionNav = forwardRef<HTMLElement, SectionNavProps>(
  (
    { children, title, darkMode: darkModeProp, ...rest }: SectionNavProps,
    forwardedRef,
  ) => {
    return (
      <LeafyGreenProvider darkMode={darkModeProp}>
        <nav {...rest} ref={forwardedRef}>
          {title && <Body>{title}</Body>}
          <ol className={orderedListStyles}>{children}</ol>
        </nav>
      </LeafyGreenProvider>
    );
  },
);

SectionNav.displayName = 'SectionNav';
