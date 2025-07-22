import React from 'react';

import CheckmarkWithCircle from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { InlineMessageFeedbackProps } from '..';

import {
  containerStyles,
  getIconFill,
  getTextStyles,
} from './SubmittedState.styles';

export const SubmittedState = ({
  submittedMessage,
}: Pick<InlineMessageFeedbackProps, 'submittedMessage'>) => {
  const { theme } = useDarkMode();

  return (
    <div className={containerStyles}>
      <CheckmarkWithCircle fill={getIconFill(theme)} />
      <Body className={getTextStyles(theme)}>{submittedMessage}</Body>
    </div>
  );
};
