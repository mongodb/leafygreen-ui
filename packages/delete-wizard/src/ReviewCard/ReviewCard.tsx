import React from 'react';

import { Card } from '@leafygreen-ui/card';
import { ExpandableCard } from '@leafygreen-ui/expandable-card';
import { Body, Subtitle } from '@leafygreen-ui/typography';

import {
  defaultCompleteDescription,
  defaultCompleteTitle,
  defaultErrorDescription,
  defaultErrorTitle,
  defaultLoadingDescription,
  defaultLoadingTitle,
} from './constants';
import {
  cardContentWrapperStyles,
  descriptionBodyStyles,
  expandableCardContentStyles,
  reviewCardStyles,
} from './ReviewCard.styles';
import { type ReviewCardProps, ReviewState } from './ReviewCard.types';
import { ReviewCardDescription, ReviewCardTitleElement } from './utils';

export const ReviewCard = ({
  state,
  title,
  description,
  errorTitle = defaultErrorTitle,
  errorDescription = defaultErrorDescription,
  loadingTitle = defaultLoadingTitle,
  loadingDescription = defaultLoadingDescription,
  completedTitle = defaultCompleteTitle,
  completedDescription = defaultCompleteDescription,
  children,
  ...rest
}: ReviewCardProps) => {
  if (state === ReviewState.Review) {
    return (
      <ExpandableCard
        title={title}
        description={description}
        className={reviewCardStyles}
        contentClassName={expandableCardContentStyles}
        defaultOpen={false}
        {...rest}
      >
        <div className={cardContentWrapperStyles}>{children}</div>
      </ExpandableCard>
    );
  }

  return (
    <Card className={reviewCardStyles}>
      <Subtitle>
        <ReviewCardTitleElement
          state={state}
          title={title}
          completedTitle={completedTitle}
          loadingTitle={loadingTitle}
          errorTitle={errorTitle}
        />
      </Subtitle>
      {description && (
        <Body as="div" className={descriptionBodyStyles}>
          <ReviewCardDescription
            state={state}
            description={description}
            completedDescription={completedDescription}
            loadingDescription={loadingDescription}
            errorDescription={errorDescription}
          />
        </Body>
      )}
    </Card>
  );
};
