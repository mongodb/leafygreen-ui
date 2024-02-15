import omit from 'lodash/omit';

import { FormFieldState } from '@leafygreen-ui/form-field';

export const DatePickerState = omit(FormFieldState, 'Valid');
export type DatePickerState =
  (typeof DatePickerState)[keyof typeof DatePickerState];

export const AutoComplete = {
  Off: 'off',
  On: 'on',
  Bday: 'bday',
} as const;

export type AutoComplete = (typeof AutoComplete)[keyof typeof AutoComplete];
