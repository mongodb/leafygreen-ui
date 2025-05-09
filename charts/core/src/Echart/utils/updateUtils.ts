import {
  EChartOptions,
  EChartSeriesOption,
  EChartsGetOptionReturnType,
} from '../Echart.types';

export function getOptionsToUpdateWithAddedSeries(
  currentOptions: EChartsGetOptionReturnType | undefined,
  data: EChartSeriesOption,
): Partial<EChartOptions> {
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
  currentOptions: EChartsGetOptionReturnType | undefined,
  id: string,
): Partial<EChartOptions> {
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
