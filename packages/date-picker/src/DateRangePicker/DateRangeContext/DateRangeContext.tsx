import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { DateRangeType, DateType } from '../../types';
import { addMonthsUTC, setToUTCMidnight } from '../../utils';
import { getInitialHighlight } from '../utils/getInitialHighlight';
import { getInitialMonth } from '../utils/getInitialMonth';

import {
  DateRangeContextProps,
  DateRangeProviderProps,
} from './DateRangeContext.types';
import { useDateRangeComponentRefs } from './useDateRangeComponentRefs';

/** A context for DateRange picker */
const DateRangeContext = createContext<DateRangeContextProps>(
  {} as DateRangeContextProps,
);

/** A hook to access DateRange picker context */
export const useDateRangeContext = () => useContext(DateRangeContext);

/**
 * A provider for DateRange picker.
 */
export const DateRangeProvider = ({
  children,
  value,
  setValue: _setValue,
  handleValidation,
  rootRef,
}: PropsWithChildren<DateRangeProviderProps>) => {
  const refs = useDateRangeComponentRefs(rootRef);
  const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
  const [month, setMonth] = useState<Date>(getInitialMonth(value, today));
  const nextMonth = useMemo(() => addMonthsUTC(month, 1), [month]);

  /** Handle possible side effects here */
  const setValue = (newRange?: DateRangeType) => {
    _setValue(newRange);
  };

  // Keep track of the element the user is highlighting with the keyboard
  const [highlight, setHighlight] = useState<DateType>(
    getInitialHighlight(value, today, month),
  );

  const getHighlightedCell = () => {
    const highlightKey = highlight?.toISOString();
    return highlightKey
      ? refs.calendarCellRefs(highlightKey)?.current
      : undefined;
  };

  return (
    <DateRangeContext.Provider
      value={{
        refs,
        today,
        value,
        setValue,
        handleValidation,
        month,
        nextMonth,
        setMonth,
        highlight,
        setHighlight,
        getHighlightedCell,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};
