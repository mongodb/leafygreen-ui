import { DatePickerProps as LGDatePickerProps } from '@leafygreen-ui/date-picker';

import { DistributiveOmit } from '../../../shared.types';

export type DatePickerProps = DistributiveOmit<
  LGDatePickerProps,
  'size' | 'darkMode'
>;
