import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import { SeriesContextType, SeriesProviderProps } from './SeriesContext.types';

export const SeriesContext = createContext<SeriesContextType>({
  checkedState: new Set(),
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
  const [checkedState, setCheckedState] = useState<Set<string>>(
    () => new Set(series),
  );

  const isChecked = useCallback(
    (id: string) => checkedState.has(id),
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

  const toggleSeries = useCallback((id: string) => {
    setCheckedState(prev => {
      const newSet = new Set(prev);

      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }

      return newSet;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    setCheckedState(() => {
      const newSet = isSelectAllChecked() ? new Set<string>() : new Set(series);
      return newSet;
    });
  }, [isSelectAllChecked, series]);

  const value = useMemo(
    () => ({
      checkedState,
      isChecked,
      isSelectAllChecked,
      isSelectAllIndeterminate,
      toggleSeries,
      toggleSelectAll,
    }),
    [
      checkedState,
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
