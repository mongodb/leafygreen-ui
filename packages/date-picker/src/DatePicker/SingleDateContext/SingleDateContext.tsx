import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { usePrevious } from '@leafygreen-ui/hooks';

import {
  DateType,
  getFirstOfMonth,
  setToUTCMidnight,
  useDatePickerContext,
} from '../../shared';
import { getISODate, isSameUTCDay } from '../../shared/utils';
import { getInitialHighlight } from '../utils/getInitialHighlight';

import {
  SingleDateContextProps,
  SingleDateProviderProps,
} from './SingleDateContext.types';
import { useDateRangeComponentRefs } from './useDatePickerComponentRefs';

const SingleDateContext = createContext<SingleDateContextProps>(
  {} as SingleDateContextProps,
);

/**
 * A provider for context values in a single DatePicker
 */
export const SingleDateProvider = ({
  children,
  value,
  setValue: _setValue,
  handleValidation,
}: PropsWithChildren<SingleDateProviderProps>) => {
  const refs = useDateRangeComponentRefs();
  const { isOpen, setOpen } = useDatePickerContext();
  const prevValue = usePrevious(value);

  const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);

  /**
   * Keep track of the displayed month
   */
  const [month, _setMonth] = useState<Date>(getFirstOfMonth(value ?? today));

  /**
   * Keep track of the element the user is highlighting with the keyboard
   */
  const [highlight, _setHighlight] = useState<DateType>(
    getInitialHighlight(value, today, month),
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
   * Opens the menu and handles side effects
   */
  const openMenu = () => {
    setOpen(true);
  };

  /** Closes the menu and handles side effects */
  const closeMenu = () => {
    setOpen(false);

    // Perform side effects once the state has settle
    requestAnimationFrame(() => {
      // Return focus to the calendar button
      refs.calendarButtonRef.current?.focus();
      // update month to something valid
      setMonth(getFirstOfMonth(value ?? today));
      // update highlight to something valid
      setHighlight(getInitialHighlight(value, today, month));
    });
  };

  /** Toggles the menu and handles appropriate side effects */
  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
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
