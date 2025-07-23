import { FormFieldFeedbackProps } from '@leafygreen-ui/form-field';
import { LgIdProps } from '@leafygreen-ui/lib';

import { NotificationProps } from '../PasswordInput/PasswordInput.types';

export interface PasswordInputFeedbackProps extends LgIdProps {
  id: string;
  hasCustomDescription: boolean;
  hasStateNotifications: boolean;
  notifications: Array<NotificationProps>;
  formFieldFeedbackProps: FormFieldFeedbackProps;
}
