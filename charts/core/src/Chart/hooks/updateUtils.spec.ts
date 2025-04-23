import { ChartOptions } from '../Chart.types';

import {
  getOptionsToUpdateWithAddedSeries,
  getOptionsToUpdateWithRemovedSeries,
} from './updateUtils';

describe('@lg-charts/core/Chart/hooks/updateUtils', () => {
  test('getOptionsToUpdateWithAddedSeries should return options with an added series', () => {
    const currentOptions: Partial<ChartOptions> = {
      series: [{ id: 'series-1' }],
    };
    const newSeriesId = 'series-2';
    const data = { id: newSeriesId };
    const updatedOptions = getOptionsToUpdateWithAddedSeries(
      currentOptions,
      data,
    );
    expect(updatedOptions.series).toHaveLength(2);
    expect(updatedOptions.series?.[1].id).toBe(newSeriesId);
  });

  test('getOptionsToUpdateWithAddedSeries should return options without an added series if a series with the same id exists', () => {
    const currentOptions: Partial<ChartOptions> = {
      series: [{ id: 'series-1' }],
    };
    const existingSeriesId = 'series-1';
    const data = { id: existingSeriesId };
    const updatedOptions = getOptionsToUpdateWithAddedSeries(
      currentOptions,
      data,
    );
    expect(updatedOptions.series).toHaveLength(1);
    expect(updatedOptions.series?.[0].id).toBe(existingSeriesId);
  });

  test('getOptionsToUpdateWithRemovedSeries should return options with a removed series', () => {
    const currentOptions: Partial<ChartOptions> = {
      series: [{ id: 'series-1' }, { id: 'series-2' }],
    };
    const seriesId1 = 'series-1';
    const seriesId2 = 'series-2';
    const updatedOptions = getOptionsToUpdateWithRemovedSeries(
      currentOptions,
      seriesId1,
    );
    expect(updatedOptions.series).toHaveLength(1);
    expect(updatedOptions.series?.[0].id).toBe(seriesId2);
  });
});
