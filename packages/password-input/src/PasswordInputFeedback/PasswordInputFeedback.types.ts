import { FormFieldFeedbackProps } from '@leafygreen-ui/form-field';

import { NotificationProps } from '../PasswordInput/PasswordInput.types';

export interface PasswordInputFeedbackProps {
  id: string;
  hasCustomDescription: boolean;
  hasStateNotifications: boolean;
  notifications: Array<NotificationProps>;
  formFieldFeedbackProps: FormFieldFeedbackProps;
}
