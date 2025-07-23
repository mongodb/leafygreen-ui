import { ComponentPropsWithoutRef } from 'react';

import { NotificationProps } from '../PasswordInput/PasswordInput.types';

export interface StateNotificationsProps
  extends ComponentPropsWithoutRef<'ul'> {
  id: string;
  notifications: Array<NotificationProps>;
}
