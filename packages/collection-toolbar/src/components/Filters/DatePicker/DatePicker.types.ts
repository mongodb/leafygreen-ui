import { DatePickerProps as LGDatePickerProps } from '@leafygreen-ui/date-picker';

export type DatePickerProps = Omit<LGDatePickerProps, 'size' | 'darkMode'>;
