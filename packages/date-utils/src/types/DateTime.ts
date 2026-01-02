import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';

export const DateTimeState = omit(FormFieldState, 'Valid');
export type DateTimeState = (typeof DateTimeState)[keyof typeof DateTimeState];

export interface StateNotification {
  state: DateTimeState;
  message: string;
}
