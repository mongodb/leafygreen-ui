import { ChartOptions } from '../Chart.types';

import { addSeries, removeSeries, updateOptions } from './updateUtils';

describe('@lg-charts/core/Chart/hooks/updateUtils', () => {
  test('should add a series to the chart options', () => {
    const currentOptions: Partial<ChartOptions> = {
      series: [{ name: 'series1' }],
    };
    const newSeriesName = 'series2';
    const data = { name: newSeriesName };
    const updatedOptions = addSeries(currentOptions, data);
    expect(updatedOptions.series).toHaveLength(2);
    expect(updatedOptions.series?.[1].name).toBe(newSeriesName);
  });

  test('should remove a series from the chart options', () => {
    const currentOptions: Partial<ChartOptions> = {
      series: [{ name: 'series1' }, { name: 'series2' }],
    };
    const seriesName1 = 'series1';
    const seriesName2 = 'series2';
    const updatedOptions = removeSeries(currentOptions, seriesName1);
    expect(updatedOptions.series).toHaveLength(1);
    expect(updatedOptions.series?.[0].name).toBe(seriesName2);
  });

  test('should update the chart options', () => {
    const currentOptions: Partial<ChartOptions> = {
      aria: {
        show: true,
      },
      grid: {
        show: false,
      },
    };
    const updatedOptions = updateOptions(currentOptions, {
      grid: {
        show: true,
      },
    });
    // @ts-ignore: Property 'show' does not exist on type 'Arrayable<AriaOption>'.
    expect(updatedOptions?.aria?.show).toBe(true);
    // @ts-ignore: Property 'show' does not exist on type 'Arrayable<GridOption>'.
    expect(updatedOptions?.grid?.show).toBe(true);
  });
});
