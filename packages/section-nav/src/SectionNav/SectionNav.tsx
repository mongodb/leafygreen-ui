import React, { forwardRef } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { getTitleStyles, orderedListStyles } from './SectionNav.styles';
import { type SectionNavProps } from './SectionNav.types';

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
