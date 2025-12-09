import React, { ReactNode } from 'react';

import { css } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Spinner } from '@leafygreen-ui/loading-indicator/spinner';
import { color, Size, spacing } from '@leafygreen-ui/tokens';
import { Description } from '@leafygreen-ui/typography';

import { type ReviewCardProps, ReviewState } from '../ReviewCard.types';

type ReviewCardDescriptionProps = Pick<
  ReviewCardProps,
  | 'state'
  | 'description'
  | 'completedDescription'
  | 'loadingDescription'
  | 'errorDescription'
>;

export const ReviewCardDescription = ({
  state,
  description,
  errorDescription,
  loadingDescription,
  completedDescription,
}: ReviewCardDescriptionProps): ReactNode => {
  const { theme } = useDarkMode();

  switch (state) {
    case ReviewState.Error:
      return (
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: ${spacing[100]}px;
            color: ${color[theme].icon.error.default};
          `}
        >
          <Icon glyph="Warning" />
          <Description>{errorDescription}</Description>
        </div>
      );
    case ReviewState.Loading:
      return (
        <Spinner
          size={Size.XSmall}
          direction={'horizontal'}
          description={loadingDescription}
        />
      );
    case ReviewState.Complete:
      return (
        <div
          className={css`
            display: flex;
            align-items: center;
            gap: ${spacing[100]}px;
            color: ${color[theme].icon.success.default};
          `}
        >
          <Icon glyph="Checkmark" />
          <Description>{completedDescription}</Description>
        </div>
      );
    case ReviewState.Review:
    default:
      return description;
  }
};
