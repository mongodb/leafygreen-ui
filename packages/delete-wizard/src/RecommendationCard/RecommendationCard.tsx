import React from 'react';

import { Badge } from '@leafygreen-ui/badge';
import { Card } from '@leafygreen-ui/card';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body, Description } from '@leafygreen-ui/typography';

import { descriptionStyles, titleStyles } from './RecommendationCard.styles';
import type { RecommendationCardProps } from './RecommendationCard.types';

export const RecommendationCard = ({
  category,
  title,
  description,
  link,
}: RecommendationCardProps) => {
  return (
    <Card>
      <Badge>{category}</Badge>
      <Body baseFontSize={BaseFontSize.Body2} className={titleStyles}>
        {title}
      </Body>
      <Description className={descriptionStyles}>{description}</Description>
      {link}
    </Card>
  );
};
