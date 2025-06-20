import React, { forwardRef } from 'react';

import { Body } from '@leafygreen-ui/typography';

import { type SectionNavProps } from './SectionNav.types';
import { orderedListStyles, getTitleStyles } from './SectionNav.styles';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

export const SectionNav = forwardRef<HTMLElement, SectionNavProps>(
  (
    { children, title, darkMode: darkModeProp, ...rest }: SectionNavProps,
    forwardedRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <nav {...rest} ref={forwardedRef}>
          {title && <Body className={getTitleStyles({ theme })}>{title}</Body>}
          <ol className={orderedListStyles}>{children}</ol>
        </nav>
      </LeafyGreenProvider>
    );
  },
);

SectionNav.displayName = 'SectionNav';
