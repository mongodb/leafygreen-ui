import React from 'react';

import { css } from '@leafygreen-ui/emotion';
import { Skeleton } from '@leafygreen-ui/skeleton-loader';

export const defaultErrorTitle = 'Error loading data';
export const defaultErrorDescription = 'Could not retrieve data';
export const defaultLoadingTitle = (
  <Skeleton
    size="small"
    className={css`
      width: 50%;
    `}
  />
);
export const defaultLoadingDescription = 'This may take a few moments';
export const defaultCompleteTitle = 'None detected';
export const defaultCompleteDescription = 'Required action complete';
