import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import {
  SeriesContextType,
  SeriesName,
  SeriesProviderProps,
} from './SeriesContext.types';

export const SeriesContext = createContext<SeriesContextType>({
  getSeriesIndex: () => -1,
  isChecked: () => true,
  isSelectAllChecked: () => true,
  isSelectAllIndeterminate: () => false,
  toggleSeries: () => {},
  toggleSelectAll: () => {},
});

export const SeriesProvider = ({
  children,
  series,
}: PropsWithChildren<SeriesProviderProps>) => {
  const [checkedState, setCheckedState] = useState<Set<SeriesName>>(
    () => new Set(series),
  );

  const getSeriesIndex = useCallback(
    (name: SeriesName) => series.indexOf(name),
    [series],
  );

  const isChecked = useCallback(
    (name: SeriesName) => checkedState.has(name),
    [checkedState],
  );

  const isSelectAllChecked = useCallback(
    () => checkedState.size === series.length,
    [checkedState, series],
  );

  const isSelectAllIndeterminate = useCallback(
    () => checkedState.size > 0 && checkedState.size < series.length,
    [checkedState, series],
  );

  const toggleSeries = useCallback((name: SeriesName) => {
    setCheckedState(prev => {
      const newSet = new Set(prev);

      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }

      return newSet;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setCheckedState(() => {
      const newSet = isSelectAllChecked()
        ? new Set<SeriesName>()
        : new Set(series);
      return newSet;
    });
  }, [isSelectAllChecked, series]);

  const value = useMemo(
    () => ({
      getSeriesIndex,
      isChecked,
      isSelectAllChecked,
      isSelectAllIndeterminate,
      toggleSeries,
      toggleSelectAll,
    }),
    [
      getSeriesIndex,
      isChecked,
      isSelectAllChecked,
      isSelectAllIndeterminate,
      toggleSeries,
      toggleSelectAll,
    ],
  );

  return (
    <SeriesContext.Provider value={value}>{children}</SeriesContext.Provider>
  );
};

export const useSeriesContext = () => {
  const context = useContext(SeriesContext);
  if (!context)
    throw new Error('useSeriesContext must be used within a SeriesProvider');
  return context;
};
