import React, { forwardRef } from 'react';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { InfoBlock, Variant } from '../InfoBlock';
import { Section } from '../Section';

import { templatesContainerStyles } from './Templates.styles';
import { TemplatesProps } from './Templates.types';

export const Templates = forwardRef<HTMLElement, TemplatesProps>(
  (
    { className, darkMode: darkModeProp, templates, title, ...rest },
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
          <div className={templatesContainerStyles}>
            {templates.map((props, index) => (
              <InfoBlock
                key={props.label + index}
                {...props}
                variant={Variant.Image}
              />
            ))}
          </div>
        </Section>
      </LeafyGreenProvider>
    );
  },
);

Templates.displayName = 'Templates';
