import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { DateType, getFirstOfMonth, setToUTCMidnight } from '../../shared';
import { getISODate } from '../../shared/utils';
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

  const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
  // Keep track of the displayed month
  const [month, _setMonth] = useState<Date>(value ?? getFirstOfMonth(today));
  // Keep track of the element the user is highlighting with the keyboard
  const [highlight, _setHighlight] = useState<DateType>(
    getInitialHighlight(value, today, month),
  );

  /** Handle possible side effects here */
  const setValue = (newRange?: DateType) => {
    _setValue(newRange ?? null);
    // TODO: update display month when value changes
  };

  /** Set the displayed month and handle side effects */
  const setMonth = (newMonth: Date) => {
    _setMonth(newMonth);
  };

  /**
   * Set the `highlight` value & handle side effects
   */
  const setHighlight = (newHighlight: DateType) => {
    _setHighlight(newHighlight);
  };

  const getCellWithValue = (date: DateType): HTMLTableCellElement | null => {
    const highlightKey = getISODate(date);
    const cell = highlightKey
      ? refs.calendarCellRefs(highlightKey)?.current
      : null;
    return cell;
  };

  const getHighlightedCell = () => {
    const highlightKey = highlight ? getISODate(highlight) : undefined;
    const cell = highlightKey
      ? refs.calendarCellRefs(highlightKey)?.current
      : undefined;

    return cell;
  };

  return (
    <SingleDateContext.Provider
      value={{
        refs,
        today,
        value,
        setValue,
        handleValidation,
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
