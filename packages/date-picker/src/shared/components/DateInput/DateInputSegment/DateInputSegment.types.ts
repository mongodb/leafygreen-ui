import { DarkModeProps, HTMLElementProps, keyMap } from '@leafygreen-ui/lib';

import { DateSegment, DateSegmentValue } from '../../../types';

export interface DateInputSegmentChangeEvent {
  segment: DateSegment;
  value: DateSegmentValue;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    [key: string]: any;
  };
}

export type DateInputSegmentChangeEventHandler = (
  dateSegmentChangeEvent: DateInputSegmentChangeEvent,
) => void;

export interface DateInputSegmentProps
  extends DarkModeProps,
    Omit<HTMLElementProps<'input'>, 'onChange'> {
  /** Which date segment this input represents. Determines the aria-label, and min/max values where relevant */
  segment: DateSegment;

  /** The value of the date segment */
  value: DateSegmentValue;

  /** Optional minimum value. Defaults to 0 for day/month segments, and 1970 for year segments */
  min?: number;

  /** Optional maximum value. Defaults to 31 for day, 12 for month, 2038 for year */
  max?: number;

  onChange: DateInputSegmentChangeEventHandler;
}
