import defaults from 'lodash/defaults';
import defaultTo from 'lodash/defaultTo';

import {
  getMinMax,
  isInRange as getIsInRange,
  MAX_DATE,
  MIN_DATE,
  SupportedLocales,
  toDate,
} from '@leafygreen-ui/date-utils';
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
