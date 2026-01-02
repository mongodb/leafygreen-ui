import { DateTimeState } from '@leafygreen-ui/date-utils';

export { DateTimeState as DatePickerState };

export const AutoComplete = {
  Off: 'off',
  On: 'on',
  Bday: 'bday',
} as const;

export type AutoComplete = (typeof AutoComplete)[keyof typeof AutoComplete];
