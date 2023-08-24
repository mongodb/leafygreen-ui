import { ChangeEventHandler } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type DateSegment = 'day' | 'month' | 'year';

export interface DateInputSegmentProps extends DarkModeProps {
  /** Which date segment this input represents. Determines the aria-label, and min/max values where relevant */
  segment: DateSegment;

  /** The value of the date segment */
  value?: number;

  /** Optional minimum value. Defaults to 0 for day/month segments, and 1970 for year segments */
  min?: number;

  /** Optional maximum value. Defaults to 31 for day, 12 for month, 2038 for year */
  max?: number;

  /** Callback fired when the value changes */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}