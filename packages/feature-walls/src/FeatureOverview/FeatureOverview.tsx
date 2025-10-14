import React, { forwardRef, useState } from 'react';

import Card from '@leafygreen-ui/card';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Description, H3 } from '@leafygreen-ui/typography';

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '../Accordion';

import {
  cardStyles,
  getMediaSlideStyles,
  getSectionStyles,
  mediaCarouselContainerStyles,
  mediaCarouselStyles,
  textContainerStyles,
} from './FeatureOverview.styles';
import { FeatureOverviewProps } from './FeatureOverview.types';

export const FeatureOverview = forwardRef<HTMLDivElement, FeatureOverviewProps>(
  ({ className, darkMode: darkModeProp, features, title, ...rest }, fwdRef) => {
    const { darkMode } = useDarkMode(darkModeProp);

    const [index, setIndex] = useState(0);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <Card className={cardStyles}>
          <section
            {...rest}
            className={getSectionStyles(className)}
            ref={fwdRef}
          >
            <div className={textContainerStyles}>
              <H3>{title}</H3>
              <Accordion index={index} onIndexChange={setIndex}>
                {features.map(({ title, description, onExpand }) => (
                  <AccordionItem key={title}>
                    <AccordionButton onExpand={onExpand}>
                      {title}
                    </AccordionButton>
                    <AccordionPanel>
                      <Description>{description}</Description>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
            <div className={mediaCarouselContainerStyles}>
              <div className={mediaCarouselStyles}>
                {features.map(({ media }, i) => {
                  const isActive = i === index;
                  return (
                    <div key={i} className={getMediaSlideStyles(isActive)}>
                      {media}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </Card>
      </LeafyGreenProvider>
    );
  },
);

FeatureOverview.displayName = 'FeatureOverview';
