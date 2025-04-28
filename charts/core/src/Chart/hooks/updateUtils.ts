import { ECBasicOption } from 'echarts/types/dist/shared';

import { ChartOptions, SeriesOption } from '../Chart.types';

export function getOptionsToUpdateWithAddedSeries(
  currentOptions: ECBasicOption | undefined,
  data: SeriesOption,
): Partial<ChartOptions> {
  const prevSeries =
    currentOptions && Array.isArray(currentOptions?.series)
      ? currentOptions.series
      : [];

  const hasSeriesData = prevSeries.some(
    series => series.id && series.id === data.id,
  );

  if (hasSeriesData) {
    return {
      series: prevSeries,
    };
  }

  return {
    series: [...prevSeries, data],
  };
}

export function getOptionsToUpdateWithRemovedSeries(
  currentOptions: ECBasicOption | undefined,
  id: string,
): Partial<ChartOptions> {
  const prevSeries =
    currentOptions &&
    currentOptions.series &&
    Array.isArray(currentOptions?.series)
      ? currentOptions.series
      : [];

  const filteredSeries = prevSeries.filter(series => {
    if (!series) return true;

    return series.id && series.id !== id;
  });

  return {
    series: filteredSeries,
  };
}
