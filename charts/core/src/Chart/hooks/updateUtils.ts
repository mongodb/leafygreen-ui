import merge from 'lodash.merge';
import { ChartOptions, SeriesOption } from '../Chart.types';

export function addSeries(
  currentOptions: ChartOptions,
  data: SeriesOption,
): Partial<ChartOptions> {
  const updatedOptions = { ...currentOptions };

  if (!updatedOptions.series) {
    updatedOptions.series = [data];
  } else {
    updatedOptions.series.push(data);
  }

  return updatedOptions;
}

export function removeSeries(
  currentOptions: ChartOptions,
  name: string,
): Partial<ChartOptions> {
  const updatedOptions = { ...currentOptions };

  if (updatedOptions.series) {
    updatedOptions.series = updatedOptions.series.filter(
      series => series.name !== name,
    );
  }

  return updatedOptions;
}

export function updateOptions(
  currentOptions: ChartOptions,
  options: Partial<ChartOptions>,
): Partial<ChartOptions> {
  return merge({ ...currentOptions, ...options });
}
