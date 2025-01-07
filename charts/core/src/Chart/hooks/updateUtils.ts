import { ChartOptions, SeriesOption } from '../Chart.types';

export function addSeries(
  currentOptions: ChartOptions,
  data: SeriesOption,
): Partial<ChartOptions> {
  const updatedOptions = { ...currentOptions };

  const svgSymbol =
    'path://M1.00077 5.78632C0.491197 5.38594 0.491197 4.61406 1.00077 4.21368L5.38218 0.771144C6.03831 0.255614 7 0.723032 7 1.55746L7 8.44254C7 9.27697 6.03831 9.74438 5.38218 9.22885L1.00077 5.78632Z';

  if (!updatedOptions.series) {
    console.log(data);
    updatedOptions.series = [
      {
        ...data,
        markLine: {
          silent: false,
          symbol: ['none', svgSymbol],
          symbolSize: [7, 10],
          symbolRotate: 360,
          symbolOffset: ['-10%', 0],
          label: {
            show: false,
            position: 'insideStartTop',
            formatter: 'Threshold: {c}',
          },
          data: [
            {
              name: 'Threshold',
              yAxis: 900,
              emphasis: {
                label: {
                  show: true,
                },
                lineStyle: {
                  width: 1,
                },
              },
            },
          ],
          lineStyle: {
            color: 'red',
            type: 'dashed',
            width: 1,
          },
          animation: false,
        },
      },
    ];
  } else {
    if (!updatedOptions.series.some(series => series.name === data.name)) {
      updatedOptions.series.push(data);
    }
  }

  return updatedOptions;
}

export function removeSeries(
  currentOptions: ChartOptions,
  name: string,
): Partial<ChartOptions> {
  const updatedOptions = { ...currentOptions };

  if (updatedOptions.series) {
    updatedOptions.series = [
      ...updatedOptions.series.filter(series => series.name !== name),
    ];
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
