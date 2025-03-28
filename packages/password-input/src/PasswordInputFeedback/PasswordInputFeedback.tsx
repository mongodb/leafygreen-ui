import React from 'react';

import { FormFieldFeedback } from '@leafygreen-ui/form-field';

import { StateNotifications } from '../StateNotifications';

import { PasswordInputFeedbackProps } from './PasswordInputFeedback.types';

export const PasswordInputFeedback = ({
  id,
  hasCustomDescription,
  hasStateNotifications,
  notifications,
  formFieldFeedbackProps,
  'data-lgid': dataLgId,
}: PasswordInputFeedbackProps) => {
  if (hasCustomDescription) {
    return null;
  }

  if (hasStateNotifications) {
    return (
      <StateNotifications
        data-testid={dataLgId}
        data-lgid={dataLgId}
        id={id}
        notifications={notifications}
      />
    );
  }

  return <FormFieldFeedback id={id} {...formFieldFeedbackProps} />;
};

PasswordInputFeedback.displayName = 'PasswordInputFeedback';
