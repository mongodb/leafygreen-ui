import { isWithinInterval } from 'date-fns';
import { defaults, defaultTo } from 'lodash';

import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { toDate } from '../utils/toDate';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';

export const MIN_DATE = new Date('12-31-1969');
export const MAX_DATE = new Date('01-19-2038');
export const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

/** The default context value */
export const defaultDatePickerContext: DatePickerContextProps = {
  label: '',
  description: '',
  dateFormat: 'iso8601',
  timeZone: TZ,
  min: MIN_DATE,
  max: MAX_DATE,
  isOpen: false,
  isInRange: () => true,
  disabled: false,
  size: Size.Default,
  state: 'unset',
  errorMessage: '',
  baseFontSize: BaseFontSize.Body1,
  darkMode: false,
  menuId: '',
  segmentRefs: () => undefined,
};

/**
 * Returns an `isInRange` function,
 * with `min` and `max` values in the closure
 */
export const getIsInRange =
  (min: Date, max: Date) =>
  (d?: Date | null): boolean =>
    !!(
      d &&
      isWithinInterval(d, {
        start: min,
        end: max,
      })
    );

/**
 * Returns a valid `Context` value given optional provider props
 */
export const getContextProps = (
  value: DatePickerProviderProps,
): DatePickerContextProps => {
  const { min, max, ...rest } = value;
  const providerValue: DatePickerContextProps = {
    ...defaults(rest, defaultDatePickerContext),
    min: defaultTo(toDate(min), defaultDatePickerContext.min),
    max: defaultTo(toDate(max), defaultDatePickerContext.max),
  };

  const isInRange = getIsInRange(providerValue.min, providerValue.max);

  return { ...providerValue, isInRange };
};
