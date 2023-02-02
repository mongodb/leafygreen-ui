import { ComponentPropsWithoutRef } from 'react';

import { NotificationProps } from '../PasswordInput/PasswordInput.types';

export interface StateNotificationsProps
  extends ComponentPropsWithoutRef<'ul'> {
  ariaDescribedby: string;
  notifications: Array<NotificationProps>;
}
