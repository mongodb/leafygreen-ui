import { isBefore, isWithinInterval } from 'date-fns';
import defaults from 'lodash/defaults';
import defaultTo from 'lodash/defaultTo';

import {
  DateType,
  getISODate,
  isValidDate,
  toDate,
} from '@leafygreen-ui/date-utils';
import { consoleOnce } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

import { MAX_DATE, MIN_DATE } from '../constants';
import { AutoComplete, BaseDatePickerProps, DatePickerState } from '../types';
import { ModifiedPopoverProps } from '../types/BaseDatePickerProps.types';
import { getFormatParts } from '../utils';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProviderProps,
} from './SharedDatePickerContext.types';

export type ModifiedPopoverPropkeys = keyof ModifiedPopoverProps;

export type ContextPropKeys = keyof SharedDatePickerProviderProps &
  keyof BaseDatePickerProps;

/**
 * Prop names that are extended from popoverProps
 * */
export const modifiedPopoverPropNames: Array<ModifiedPopoverPropkeys> = [
  'scrollContainer',
  'portalContainer',
  'portalClassName',
  'align',
  'justify',
  'spacing',
  'adjustOnMutation',
  'popoverZIndex',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
  'contentClassName',
];

/**
 * Prop names that are in both DatePickerProps and SharedDatePickerProviderProps
 * */
export const contextPropNames: Array<ContextPropKeys> = [
  'aria-label',
  'aria-labelledby',
  'label',
  'description',
  'locale',
  'timeZone',
  'min',
  'max',
  'baseFontSize',
  'disabled',
  'size',
  'errorMessage',
  'initialOpen',
  'state',
  'autoComplete',
  'darkMode',
  ...modifiedPopoverPropNames,
];

/** The default context value */
export const defaultSharedDatePickerContext: SharedDatePickerContextProps = {
  ariaLabelProp: '',
  ariaLabelledbyProp: '',
  label: '',
  description: '',
  locale: 'iso8601',
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
  errorMessage: '',
  baseFontSize: BaseFontSize.Body1,
  darkMode: false,
  menuId: '',
  isSelectOpen: false,
  setIsSelectOpen: () => {},
  stateNotification: {
    state: DatePickerState.None,
    message: '',
  },
  setInternalErrorMessage: () => {},
  clearInternalErrorMessage: () => {},
  autoComplete: AutoComplete.Off,
};

/**
 * Returns an `isInRange` function,
 * with `min` and `max` values in the closure
 */
export const getIsInRange =
  (min: Date, max: Date) =>
  (d?: DateType): boolean =>
    !!(
      isValidDate(d) &&
      isWithinInterval(d, {
        start: min,
        end: max,
      })
    );

/**
 * Returns a valid `Context` value given optional provider props
 */
export const getContextProps = (
  providerProps: SharedDatePickerProviderProps,
): SharedDatePickerContextProps => {
  const {
    min: minProp,
    max: maxProp,
    timeZone: tzProp,
    ...rest
  } = providerProps;

  const timeZone = defaultTo(
    tzProp,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  const [min, max] = getMinMax(toDate(minProp), toDate(maxProp));

  const providerValue: SharedDatePickerContextProps = {
    ...defaults(rest, defaultSharedDatePickerContext),
    timeZone,
    min,
    max,
  };

  const isInRange = getIsInRange(providerValue.min, providerValue.max);

  // Only used to track the _order_ of segments, not the value itself
  const formatParts = getFormatParts(providerValue.locale);

  return { ...providerValue, isInRange, formatParts };
};

const getMinMax = (min: Date | null, max: Date | null): [Date, Date] => {
  const defaultRange: [Date, Date] = [
    defaultSharedDatePickerContext.min,
    defaultSharedDatePickerContext.max,
  ];

  // if both are defined
  if (min && max) {
    if (isBefore(max, min)) {
      consoleOnce.error(
        `LeafyGreen DatePicker: Provided max date (${getISODate(
          max,
        )}) is before provided min date (${getISODate(
          min,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, max];
  } else if (min) {
    if (isBefore(defaultSharedDatePickerContext.max, min)) {
      consoleOnce.error(
        `LeafyGreen DatePicker: Provided min date (${getISODate(
          min,
        )}) is after the default max date (${getISODate(
          defaultSharedDatePickerContext.max,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, defaultSharedDatePickerContext.max];
  } else if (max) {
    if (isBefore(max, defaultSharedDatePickerContext.min)) {
      consoleOnce.error(
        `LeafyGreen DatePicker: Provided max date (${getISODate(
          max,
        )}) is before the default min date (${getISODate(
          defaultSharedDatePickerContext.min,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [defaultSharedDatePickerContext.min, max];
  }

  return defaultRange;
};
