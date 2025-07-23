import React, {
  createContext,
  PropsWithChildren,
  SyntheticEvent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import isNull from 'lodash/isNull';

import {
  DateType,
  getFirstOfUTCMonth,
  getISODate,
  isOnOrBefore,
  isSameUTCDay,
  isValidDate,
} from '@leafygreen-ui/date-utils';
import { usePrevious } from '@leafygreen-ui/hooks';

import { useSharedDatePickerContext } from '../../shared/context';
import { getFormattedDateString } from '../../shared/utils';
import { getInitialHighlight } from '../utils/getInitialHighlight';

import {
  DatePickerContextProps,
  DatePickerProviderProps,
} from './DatePickerContext.types';
import { useDateRangeComponentRefs } from './useDatePickerComponentRefs';

export const DatePickerContext = createContext<DatePickerContextProps>(
  {} as DatePickerContextProps,
);

/**
 * A provider for context values in a single DatePicker
 */
export const DatePickerProvider = ({
  children,
  value,
  setValue: _setValue,
  handleValidation: _handleValidation,
}: PropsWithChildren<DatePickerProviderProps>) => {
  const refs = useDateRangeComponentRefs();
  const {
    isOpen,
    setOpen,
    disabled,
    min,
    max,
    locale,
    timeZone,
    setInternalErrorMessage,
    clearInternalErrorMessage,
    isInRange,
  } = useSharedDatePickerContext();
  const prevValue = usePrevious(value);

  const hour = new Date(Date.now()).getHours();

  // Update this value every hour
  const today = useMemo(
    () => new Date(Date.now()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hour],
  );

  /** Internal callback to get a valid `month` from a given date value */
  const getMonthFromValue = useCallback(
    (val?: DateType) => getFirstOfUTCMonth(isValidDate(val) ? val : today),
    [today],
  );

  /**
   * Keep track of the displayed month
   */
  const [month, _setMonth] = useState<Date>(getMonthFromValue(value));

  /**
   * Keep track of the element the user is highlighting with the keyboard
   */
  const [highlight, _setHighlight] = useState<Date>(
    getInitialHighlight(value, today, timeZone),
  );

  /***********
   * SETTERS *
   ***********/

  /**
   * Set the value and run side effects here
   */
  const setValue = (newVal?: DateType) => {
    _setValue(newVal ?? null);
    setMonth(getMonthFromValue(newVal));
  };

  /**
   * Set the displayed month and handle side effects
   */
  const setMonth = useCallback((newMonth: Date) => {
    _setMonth(newMonth);
  }, []);

  /**
   * Set the `highlight` value & handle side effects
   */
  const setHighlight = useCallback((newHighlight: Date) => {
    _setHighlight(newHighlight);
  }, []);

  /**
   * Handles internal validation,
   * and calls the provided `handleValidation` callback
   */
  const handleValidation = (val?: DateType): void => {
    // Set an internal error state if necessary
    if (isValidDate(val)) {
      if (isInRange(val)) {
        clearInternalErrorMessage();
      } else {
        if (isOnOrBefore(val, min)) {
          setInternalErrorMessage(
            `Date must be after ${getFormattedDateString(min, locale)}`,
          );
        } else {
          setInternalErrorMessage(
            `Date must be before ${getFormattedDateString(max, locale)}`,
          );
        }
      }
    } else if (isNull(val)) {
      // This could still be an error, but it's not defined internally
      clearInternalErrorMessage();
    }

    _handleValidation?.(val);
  };

  /**
   * Track the event that last triggered the menu to open/close
   */
  const [menuTriggerEvent, setMenuTriggerEvent] = useState<SyntheticEvent>();

  /**
   * Opens the menu and handles side effects
   */
  const openMenu = (triggerEvent?: SyntheticEvent) => {
    setMenuTriggerEvent(triggerEvent);
    setOpen(true);
  };

  /** Closes the menu and handles side effects */
  const closeMenu = (triggerEvent?: SyntheticEvent) => {
    setMenuTriggerEvent(triggerEvent);
    setOpen(false);

    // Perform side effects once the state has settled
    requestAnimationFrame(() => {
      if (!disabled) {
        // Return focus to the calendar button
        refs.calendarButtonRef.current?.focus();
      }
      // update month to something valid
      setMonth(getMonthFromValue(value));
      // update highlight to something valid
      setHighlight(getInitialHighlight(value, today, timeZone));
    });
  };

  /** Toggles the menu and handles appropriate side effects */
  const toggleMenu = (triggerEvent?: SyntheticEvent) => {
    if (isOpen) {
      closeMenu(triggerEvent);
    } else {
      openMenu(triggerEvent);
    }
  };

  /***********
   * GETTERS *
   ***********/

  /**
   * Returns the cell element with the provided value
   */
  const getCellWithValue = (date: DateType): HTMLTableCellElement | null => {
    if (isInRange(date)) {
      const highlightKey = getISODate(date);
      const cell = highlightKey
        ? refs.calendarCellRefs(highlightKey)?.current
        : null;
      return cell;
    }

    return null;
  };

  /**
   * Returns the cell element with the current highlight value
   */
  const getHighlightedCell = (): HTMLTableCellElement | null => {
    return getCellWithValue(highlight);
  };

  /****************
   * SIDE EFFECTS *
   ****************/

  /**
   * If `value` prop changes, update the month
   */
  useEffect(() => {
    if (!isSameUTCDay(value, prevValue)) {
      setMonth(getMonthFromValue(value));
    }
  }, [getMonthFromValue, prevValue, setMonth, today, value]);

  return (
    <DatePickerContext.Provider
      value={{
        refs,
        today,
        value,
        setValue,
        handleValidation,
        closeMenu,
        openMenu,
        toggleMenu,
        menuTriggerEvent,
        month,
        setMonth,
        highlight,
        setHighlight,
        getHighlightedCell,
        getCellWithValue,
      }}
    >
      {children}
    </DatePickerContext.Provider>
  );
};

/**
 * Access single date picker context values
 */
export const useDatePickerContext = () => {
  return useContext(DatePickerContext);
};
