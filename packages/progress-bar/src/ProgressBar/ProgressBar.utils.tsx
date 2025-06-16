import React from 'react';

import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import ImportantWithCircleIcon from '@leafygreen-ui/icon/dist/ImportantWithCircle';
import InfoWithCircleIcon from '@leafygreen-ui/icon/dist/InfoWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';

import { ProgressBarVariant } from './ProgressBar.types';

export const getProgressBarIcon = (variant: ProgressBarVariant) => {
  switch (variant) {
    case 'success':
      return <CheckmarkWithCircleIcon />;
    case 'warning':
      return <ImportantWithCircleIcon />;
    case 'error':
      return <WarningIcon />; // design uses warning icon for error variant
    default:
      return <InfoWithCircleIcon />;
  }
};
