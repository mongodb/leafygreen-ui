import React from 'react';

import CheckmarkWithCircle from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import { palette } from '@leafygreen-ui/palette';
import { Body } from '@leafygreen-ui/typography';

import { InlineMessageFeedbackProps } from '..';

import { baseStyles, bodyStyles } from './SubmittedState.styles';

export const SubmittedState = ({
  submittedMessage,
}: Pick<InlineMessageFeedbackProps, 'submittedMessage'>) => {
  return (
    <div className={baseStyles}>
      <CheckmarkWithCircle color={palette.green.dark1} />
      <Body className={bodyStyles}>{submittedMessage}</Body>
    </div>
  );
};
