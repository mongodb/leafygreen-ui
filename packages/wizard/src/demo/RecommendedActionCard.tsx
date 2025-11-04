import React, { ReactNode } from 'react';

import { Badge } from '@leafygreen-ui/badge';
import { Card } from '@leafygreen-ui/card';
import { css } from '@leafygreen-ui/emotion';
import { BaseFontSize, spacing } from '@leafygreen-ui/tokens';
import { Body, Description } from '@leafygreen-ui/typography';

export interface RecommendedActionCardProps {
  category: string;
  title: string;
  description: string;
  link: ReactNode;
}

export const RecommendedActionCard = ({
  category,
  title,
  description,
  link,
}: RecommendedActionCardProps) => {
  return (
    <Card>
      <Badge>{category}</Badge>
      <Body
        baseFontSize={BaseFontSize.Body2}
        className={css`
          font-weight: 600;
          margin-block: ${spacing[200]}px;
        `}
      >
        {title}
      </Body>
      <Description
        className={css`
          margin-block: ${spacing[200]}px;
        `}
      >
        {description}
      </Description>
      {link}
    </Card>
  );
};
