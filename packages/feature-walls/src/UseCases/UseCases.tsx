import React, { forwardRef } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { ExpandableGrid } from '../ExpandableGrid';
import { InfoBlock, Variant } from '../InfoBlock';
import { Section } from '../Section';

import { UseCasesProps } from './UseCases.types';

export const UseCases = forwardRef<HTMLElement, UseCasesProps>(
  (
    {
      cases,
      className,
      darkMode: darkModeProp,
      maxColumns = 3,
      title,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <Section
          {...rest}
          className={className}
          ref={fwdRef}
          title={title}
          renderInCard
        >
          <ExpandableGrid maxColumns={maxColumns}>
            {cases.map((props, index) => (
              <InfoBlock
                key={props.label + index}
                {...props}
                variant={Variant.Icon}
              />
            ))}
          </ExpandableGrid>
        </Section>
      </LeafyGreenProvider>
    );
  },
);

UseCases.displayName = 'UseCases';
