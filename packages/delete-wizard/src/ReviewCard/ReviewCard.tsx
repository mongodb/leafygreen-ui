import React from 'react';

import { ExpandableCard } from '@leafygreen-ui/expandable-card';

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
  return (
    <ExpandableCard
      title={
        <ReviewCardTitleElement
          state={state}
          title={title}
          completedTitle={completedTitle}
          loadingTitle={loadingTitle}
          errorTitle={errorTitle}
        />
      }
      description={
        <ReviewCardDescription
          state={state}
          description={description}
          completedDescription={completedDescription}
          loadingDescription={loadingDescription}
          errorDescription={errorDescription}
        />
      }
      className={reviewCardStyles}
      contentClassName={expandableCardContentStyles}
      defaultOpen={false}
      {...rest}
    >
      {state === ReviewState.Review && (
        <div className={cardContentWrapperStyles}>{children}</div>
      )}
    </ExpandableCard>
  );
};
