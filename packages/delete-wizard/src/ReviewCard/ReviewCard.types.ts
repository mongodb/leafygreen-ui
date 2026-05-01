import type { ReactNode } from 'react';

import type { ExpandableCardProps } from '@leafygreen-ui/expandable-card';

export enum ReviewState {
  Loading = 'loading',
  Review = 'review',
  Error = 'error',
  Complete = 'complete',
}
export interface ReviewCardProps extends ExpandableCardProps {
  /**
   * @required
   * Determines which title and description are rendered
   */
  state: ReviewState;

  /**
   * Title displayed when state === 'error'
   * @default 'Error loading data'
   */
  errorTitle?: ReactNode;

  /**
   * Description displayed when state === 'error'
   * @default 'Could not retrieve data'
   */
  errorDescription?: ReactNode;

  /**
   * Title displayed when state === 'loading'
   * @default Skeleton loader
   */
  loadingTitle?: ReactNode;

  /**
   * Description displayed when state === 'loading'
   * @default 'This may take a few moments'
   */
  loadingDescription?: string;

  /**
   * Title displayed when state === 'complete'
   * @default 'None detected'
   */
  completedTitle?: ReactNode;
  /**
   * Description displaced when state === 'complete'
   * @default 'Review complete'
   */
  completedDescription?: ReactNode;
}
export interface InheritedReviewCardProps
  extends Omit<ExpandableCardProps, 'title' | 'description'> {}
