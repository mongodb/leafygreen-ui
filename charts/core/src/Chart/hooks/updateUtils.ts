import { ECBasicOption } from 'echarts/types/dist/shared';

import { ChartOptions, SeriesOption } from '../Chart.types';

export function addSeries(
  currentOptions: ECBasicOption | undefined,
  data: SeriesOption,
): Partial<ChartOptions> {
  const updatedOptions = { ...currentOptions };

  if (Array.isArray(updatedOptions.series)) {
    const hasSeriesData = updatedOptions.series.some(
      series => series.name === data.name,
    );

    if (!hasSeriesData) {
      updatedOptions.series.push(data);
    }
  } else {
    updatedOptions.series = [data];
  }

  return updatedOptions;
}

export function removeSeries(
  currentOptions: ECBasicOption | undefined,
  name: string,
): Partial<ChartOptions> {
  const updatedOptions = { ...currentOptions };

  if (!Array.isArray(updatedOptions.series)) {
    return updatedOptions;
  }

  updatedOptions.series = [
    ...updatedOptions.series.filter(series => series.name !== name),
  ];

  return updatedOptions;
}

/**
 * Method to recursively merge two objects. It should update keys if they
 * already exist and add them if they don't. However, it shouldn't completely
 * overwrite a key it's an already existing object.
 *
 * They goal is to allow for partial updates to the chart options object.
 */
function recursiveMerge(
  target: { [key: string]: any },
  source: { [key: string]: any },
) {
  const updatedObj = { ...target };

  for (const key in source) {
    if (
      typeof source[key] === 'object' &&
      typeof updatedObj[key] === 'object'
    ) {
      // Recursively update nested objects
      updatedObj[key] = recursiveMerge(updatedObj[key], source[key]);
    } else {
      // Update or add the value for the key
      updatedObj[key] = source[key];
    }
  }

  return updatedObj;
}

export function updateOptions(
  currentOptions: ECBasicOption | undefined,
  options: Partial<ChartOptions>,
): Partial<ChartOptions> {
  return recursiveMerge(currentOptions || {}, options);
}
