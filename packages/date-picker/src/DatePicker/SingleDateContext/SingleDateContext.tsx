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

import { usePrevious } from '@leafygreen-ui/hooks';

import { DateType, getFirstOfMonth, useDatePickerContext } from '../../shared';
import {
  getFormattedDateString,
  getISODate,
  isOnOrBefore,
  isSameUTCDay,
} from '../../shared/utils';
import { getInitialHighlight } from '../utils/getInitialHighlight';

import {
  SingleDateContextProps,
  SingleDateProviderProps,
} from './SingleDateContext.types';
import { useDateRangeComponentRefs } from './useDatePickerComponentRefs';

export const SingleDateContext = createContext<SingleDateContextProps>(
  {} as SingleDateContextProps,
);

/**
 * A provider for context values in a single DatePicker
 */
export const SingleDateProvider = ({
  children,
  value,
  setValue: _setValue,
  handleValidation: _handleValidation,
}: PropsWithChildren<SingleDateProviderProps>) => {
  const refs = useDateRangeComponentRefs();
  const {
    isOpen,
    setOpen,
    disabled,
    min,
    max,
    dateFormat,
    setInternalErrorMessage,
    clearInternalErrorMessage,
    isInRange,
  } = useDatePickerContext();
  const prevValue = usePrevious(value);

  const today = useMemo(
    () => new Date(Date.now()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [new Date(Date.now()).getDate()],
  );

  /**
   * Keep track of the displayed month
   */
  const [month, _setMonth] = useState<Date>(getFirstOfMonth(value ?? today));

  /**
   * Keep track of the element the user is highlighting with the keyboard
   */
  const [highlight, _setHighlight] = useState<DateType>(
    getInitialHighlight(value, today),
  );

  /***********
   * SETTERS *
   ***********/

  /**
   * Set the value and run side effects here
   */
  const setValue = (newVal?: DateType) => {
    _setValue(newVal ?? null);
    setMonth(getFirstOfMonth(newVal ?? today));
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
  const setHighlight = useCallback((newHighlight: DateType) => {
    _setHighlight(newHighlight);
  }, []);

  /**
   * Handles internal validation,
   * and calls the provided `handleValidation` callback
   */
  const handleValidation = (val?: DateType) => {
    // Set an internal error state if necessary
    if (val && !isInRange(val)) {
      if (isOnOrBefore(val, min)) {
        setInternalErrorMessage(
          `Date must be after ${getFormattedDateString(min, dateFormat)}`,
        );
      } else {
        setInternalErrorMessage(
          `Date must be before ${getFormattedDateString(max, dateFormat)}`,
        );
      }
    } else {
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
      setMonth(getFirstOfMonth(value ?? today));
      // update highlight to something valid
      setHighlight(getInitialHighlight(value, today));
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
    const highlightKey = getISODate(date);
    const cell = highlightKey
      ? refs.calendarCellRefs(highlightKey)?.current
      : null;
    return cell;
  };

  /**
   * Returns the cell element with the current highlight value
   */
  const getHighlightedCell = () => {
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
      setMonth(getFirstOfMonth(value ?? today));
    }
  }, [prevValue, setMonth, today, value]);

  return (
    <SingleDateContext.Provider
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
    </SingleDateContext.Provider>
  );
};

/**
 * Access single date picker context values
 */
export const useSingleDateContext = () => {
  return useContext(SingleDateContext);
};
