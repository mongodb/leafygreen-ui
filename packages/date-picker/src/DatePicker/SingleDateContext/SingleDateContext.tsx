import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  DateType,
  getFirstOfMonth,
  isSameUTCMonth,
  setToUTCMidnight,
} from '../../shared';

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
  const [month, setMonth] = useState<Date>(value ?? getFirstOfMonth(today));

  /** Handle possible side effects here */
  const setValue = (newRange?: DateType) => {
    _setValue(newRange ?? null);
  };

  // Keep track of the element the user is highlighting with the keyboard
  const [highlight, setHighlight] = useState<DateType>(
    value ?? isSameUTCMonth(today, month) ? today : month,
  );

  const getHighlightedCell = () => {
    const highlightKey = highlight?.toISOString();
    return highlightKey
      ? refs.calendarCellRefs(highlightKey)?.current
      : undefined;
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
