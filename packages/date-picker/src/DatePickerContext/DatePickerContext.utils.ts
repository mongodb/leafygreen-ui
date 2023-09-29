import { isWithinInterval } from 'date-fns';
import defaults from 'lodash/defaults';
import defaultTo from 'lodash/defaultTo';

import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { BaseDatePickerProps } from '../types';
import { getFormatParts, toDate } from '../utils';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';

export const MIN_DATE = new Date('12-31-1969');
export const MAX_DATE = new Date('01-19-2038');
export const TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;

/** Prop names that are in both DatePickerProps and DatePickerProviderProps */
export const contextPropNames: Array<
  keyof DatePickerProviderProps & keyof BaseDatePickerProps
> = [
  'label',
  'dateFormat',
  'timeZone',
  'min',
  'max',
  'baseFontSize',
  'disabled',
  'size',
  'state',
  'errorMessage',
  'initialOpen',
];

/** The default context value */
export const defaultDatePickerContext: DatePickerContextProps = {
  label: '',
  description: '',
  dateFormat: 'iso8601',
  timeZone: TZ,
  min: MIN_DATE,
  max: MAX_DATE,
  isOpen: false,
  initialOpen: false,
  setOpen: () => {},
  isDirty: false,
  setIsDirty: () => {},
  isInRange: () => true,
  disabled: false,
  size: Size.Default,
  state: 'unset',
  errorMessage: '',
  baseFontSize: BaseFontSize.Body1,
  darkMode: false,
  menuId: '',
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

  // Only used to track the _order_ of segments, not the value itself
  const formatParts = getFormatParts(providerValue.dateFormat);

  return { ...providerValue, isInRange, formatParts };
};
