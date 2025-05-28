import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { colors as defaultColors } from '@lg-charts/colors';

import { Theme } from '@leafygreen-ui/lib';

import {
  SeriesContextType,
  SeriesName,
  SeriesProviderProps,
} from './SeriesContext.types';

export const SeriesContext = createContext<SeriesContextType>({
  getColor: () => '',
  getSeriesIndex: () => -1,
  isChecked: () => true,
  isSelectAllChecked: () => true,
  isSelectAllIndeterminate: () => false,
  toggleSeries: () => {},
  toggleSelectAll: () => {},
});

const hasDuplicates = (arr: Array<string>) => {
  return new Set(arr).size !== arr.length;
};

export const SeriesProvider = ({
  children,
  customColors,
  series,
}: PropsWithChildren<SeriesProviderProps>) => {
  const [checkedState, setCheckedState] = useState<Set<SeriesName>>(
    () => new Set(series),
  );

  useEffect(() => {
    if (process.env.NODE_ENV === 'production' || !customColors) {
      return;
    }

    for (const colors of Object.values(customColors)) {
      if (colors && hasDuplicates(colors)) {
        console.warn(
          'customColors provided to SeriesProvider should not contain duplicates. This may lead to unexpected behavior.',
        );
      }
    }
  }, [customColors]);

  const getSeriesIndex = useCallback(
    (name: SeriesName) => series.indexOf(name),
    [series],
  );

  const getColor = useCallback(
    (name: SeriesName, theme: Theme) => {
      const colors = customColors ? customColors[theme] : defaultColors[theme];
      const index = getSeriesIndex(name) % colors.length; // loop through colors if more series than available colors
      return colors[index];
    },
    [customColors, getSeriesIndex],
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
      getColor,
      getSeriesIndex,
      isChecked,
      isSelectAllChecked,
      isSelectAllIndeterminate,
      toggleSeries,
      toggleSelectAll,
    }),
    [
      getColor,
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
