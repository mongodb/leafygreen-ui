import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';

import { DateType, isSameUTCMonth, setToUTCMidnight } from '../../shared';

import {
  SingleDateContextProps,
  SingleDateProviderProps,
} from './SingleDateContext.types';

const SingleDateContext = createContext<SingleDateContextProps>(
  {} as SingleDateContextProps,
);

export const SingleDateProvider = ({
  children,
  value,
  setValue: _setValue,
  handleValidation,
}: PropsWithChildren<SingleDateProviderProps>) => {
  const today = useMemo(() => setToUTCMidnight(new Date(Date.now())), []);
  const [month, setMonth] = useState<Date>(value ?? today);

  /** Handle possible side effects here */
  const setValue = (newRange?: DateType) => {
    _setValue(newRange);
  };

  // Keep track of the element the user is highlighting with the keyboard
  const [highlight, setHighlight] = useState<DateType>(
    value ?? isSameUTCMonth(today, month) ? today : month,
  );

  // TODO:
  // const getHighlightedCell = () => {
  //   const highlightKey = highlight?.toISOString();
  //   return highlightKey
  //     ? refs.calendarCellRefs(highlightKey)?.current
  //     : undefined;
  // };

  return (
    <SingleDateContext.Provider
      value={{
        today,
        value,
        setValue,
        handleValidation,
        month,
        setMonth,
        highlight,
        setHighlight,
        // TODO: getHighlightedCell,
      }}
    >
      {children}
    </SingleDateContext.Provider>
  );
};

/** Access single date picker context values */
export const useSingleDateContext = () => {
  return useContext(SingleDateContext);
};
