import React, { forwardRef } from 'react';

import { Card } from '@leafygreen-ui/card';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { H3 } from '@leafygreen-ui/typography';

import { LGIDS_SECTION } from './constants';
import { cardStyles, getSectionStyles } from './Section.styles';
import { SectionProps } from './Section.types';

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      darkMode: darkModeProp,
      renderInCard = false,
      title,
      children,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);

    const Wrapper = renderInCard ? Card : React.Fragment;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <Wrapper
          {...(renderInCard
            ? {
                className: cardStyles,
                darkMode,
                'data-testid': LGIDS_SECTION.card,
              }
            : {})}
        >
          <section
            className={getSectionStyles(className)}
            ref={fwdRef}
            {...rest}
          >
            <H3>{title}</H3>
            {children}
          </section>
        </Wrapper>
      </LeafyGreenProvider>
    );
  },
);

Section.displayName = 'Section';
