import { EChartOptions } from '../Echart.types';

import { addSeries, removeSeries, updateOptions } from './updateUtils';

describe('@lg-charts/core/Chart/hooks/updateUtils', () => {
  test('addSeries should add a series to the chart options', () => {
    const currentOptions: Partial<EChartOptions> = {
      series: [{ name: 'series1' }],
    };
    const newSeriesName = 'series2';
    const data = { name: newSeriesName };
    const updatedOptions = addSeries(currentOptions, data);
    expect(updatedOptions.series).toHaveLength(2);
    expect(updatedOptions.series?.[1].name).toBe(newSeriesName);
  });

  test('addSeries should not add a series if a chart with the same name exists', () => {
    const currentOptions: Partial<EChartOptions> = {
      series: [{ name: 'series1' }],
    };
    const newSeriesName = 'series1';
    const data = { name: newSeriesName };
    const updatedOptions = addSeries(currentOptions, data);
    expect(updatedOptions.series).toHaveLength(1);
    expect(updatedOptions.series?.[0].name).toBe(newSeriesName);
  });

  test('removeSeries should remove a series from the chart options', () => {
    const currentOptions: Partial<EChartOptions> = {
      series: [{ name: 'series1' }, { name: 'series2' }],
    };
    const seriesName1 = 'series1';
    const seriesName2 = 'series2';
    const updatedOptions = removeSeries(currentOptions, seriesName1);
    expect(updatedOptions.series).toHaveLength(1);
    expect(updatedOptions.series?.[0].name).toBe(seriesName2);
  });

  /**
   * Tests that option updates don't overwrite the entire chart options object.
   */
  test('updateOptions should merge chart options non-destructively', () => {
    const currentOptions: Partial<EChartOptions> = {
      xAxis: {
        show: true,
        splitLine: {
          show: true,
        },
      },
    };
    const updatedOptions = updateOptions(currentOptions, {
      xAxis: {
        show: false, // This should only update the show property and not other properties
      },
      grid: {
        show: true,
      },
    });
    // @ts-ignore: Property 'show' does not exist on type 'Arrayable<AriaOption>'.
    expect(updatedOptions?.xAxis?.show).toBe(false);
    // @ts-ignore: Property 'show' does not exist on type 'Arrayable<AriaOption>'.
    expect(updatedOptions?.xAxis?.splitLine?.show).toBe(true);
    // @ts-ignore: Property 'show' does not exist on type 'Arrayable<GridOption>'.
    expect(updatedOptions?.grid?.show).toBe(true);
  });
});
