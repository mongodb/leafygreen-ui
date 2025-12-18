import { isBefore } from 'date-fns';
import defaults from 'lodash/defaults';
import defaultTo from 'lodash/defaultTo';

import {
  getISODate,
  MAX_DATE,
  MIN_DATE,
  SupportedLocales,
  toDate,
  isInRange as getIsInRange,
} from '@leafygreen-ui/date-utils';
import { consoleOnce } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';

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
  'align',
  'justify',
  'spacing',
  'adjustOnMutation',
  'onEnter',
  'onEntering',
  'onEntered',
  'onExit',
  'onExiting',
  'onExited',
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
  locale: SupportedLocales.ISO_8601,
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

  console.log('🦄 min/max', {
    min: minProp,
    max: maxProp,
    defaultMin: defaultSharedDatePickerContext.min,
    defaultMax: defaultSharedDatePickerContext.max,
  });

  const [min, max] = getMinMax({
    min: toDate(minProp),
    max: toDate(maxProp),
    defaultMin: defaultSharedDatePickerContext.min,
    defaultMax: defaultSharedDatePickerContext.max,
    componentName: 'DatePicker',
  });

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

/**
 * This function is used to get the min and max dates for a component.
 * It will return the default min and max dates if the provided min and max are not valid.
 * It will also console an error if the provided min and max are not valid.
 *
 * @param {Object} params
 * @param {Date | null} params.min - The min date to check
 * @param {Date | null} params.max - The max date to check
 * @param {Date} params.defaultMin - The default min date
 * @param {Date} params.defaultMax - The default max date
 * @param {string} params.componentName - The name of the component
 * @returns - The min and max dates
 */
const getMinMax = ({
  min,
  max,
  defaultMin,
  defaultMax,
  componentName,
}: {
  min: Date | null;
  max: Date | null;
  defaultMin: Date;
  defaultMax: Date;
  componentName: string;
}): [Date, Date] => {
  const defaultRange: [Date, Date] = [defaultMin, defaultMax];

  // if both are defined
  if (min && max) {
    if (isBefore(max, min)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided max date (${getISODate(
          max,
        )}) is before provided min date (${getISODate(
          min,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, max];
  } else if (min) {
    if (isBefore(defaultMax, min)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided min date (${getISODate(
          min,
        )}) is after the default max date (${getISODate(
          defaultMax,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [min, defaultMax];
  } else if (max) {
    if (isBefore(max, defaultMin)) {
      consoleOnce.error(
        `LeafyGreen ${componentName}: Provided max date (${getISODate(
          max,
        )}) is before the default min date (${getISODate(
          defaultMin,
        )}). Using default values.`,
      );
      return defaultRange;
    }

    return [defaultMin, max];
  }

  return defaultRange;
};
