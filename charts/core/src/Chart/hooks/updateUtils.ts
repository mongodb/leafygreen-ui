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
  currentOptions: ChartOptions,
  options: Partial<ChartOptions>,
): Partial<ChartOptions> {
  return recursiveMerge(currentOptions, options);
}
