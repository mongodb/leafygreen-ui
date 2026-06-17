import { FunctionComponent } from 'react';

import { type ReviewCardProps, ReviewState } from '../ReviewCard.types';

export const ReviewCardTitleElement = ({
  state,
  title,
  errorTitle,
  loadingTitle,
  completedTitle,
}: Pick<
  ReviewCardProps,
  'state' | 'title' | 'completedTitle' | 'loadingTitle' | 'errorTitle'
>): ReturnType<FunctionComponent> => {
  switch (state) {
    case ReviewState.Error:
      return errorTitle;
    case ReviewState.Loading:
      return loadingTitle;
    case ReviewState.Complete:
      return completedTitle;
    case ReviewState.Review:
    default:
      return title;
  }
};
