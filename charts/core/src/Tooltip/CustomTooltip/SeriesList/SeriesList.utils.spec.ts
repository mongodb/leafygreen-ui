import { SortDirection, SortKey } from '../../Tooltip.types';

import { sortSeriesData, SortSeriesDataParams } from './SeriesList.utils';

describe('@lg-charts/core/Tooltip/CustomTooltip/SeriesList.utils', () => {
  describe('sortSeriesData', () => {
    test('should sort series data based on name (string) in ascending order', () => {
      const seriesData = [
        { data: ['B', 2] },
        { data: ['A', 1] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Asc,
        sortKey: SortKey.Name,
      });

      expect(sortedData).toEqual([{ data: ['A', 1] }, { data: ['B', 2] }]);
    });

    test('should sort series data based on name (number) in ascending order', () => {
      const seriesData = [
        { data: [2, 'B'] },
        { data: [1, 'A'] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Asc,
        sortKey: SortKey.Name,
      });

      expect(sortedData).toEqual([{ data: [1, 'A'] }, { data: [2, 'B'] }]);
    });

    test('should sort series data based on name (string) in descending order', () => {
      const seriesData = [
        { data: ['B', 2] },
        { data: ['A', 1] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Desc,
        sortKey: SortKey.Name,
      });

      expect(sortedData).toEqual([{ data: ['B', 2] }, { data: ['A', 1] }]);
    });

    test('should sort series data based on name (number) in descending order', () => {
      const seriesData = [
        { data: [2, 'B'] },
        { data: [1, 'A'] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Desc,
        sortKey: SortKey.Name,
      });

      expect(sortedData).toEqual([{ data: [2, 'B'] }, { data: [1, 'A'] }]);
    });

    test('should sort series data based on value (number) in ascending order', () => {
      const seriesData = [
        { data: ['B', 2] },
        { data: ['A', 1] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Asc,
        sortKey: SortKey.Value,
      });

      expect(sortedData).toEqual([{ data: ['A', 1] }, { data: ['B', 2] }]);
    });

    test('should sort series data based on value (string) in ascending order', () => {
      const seriesData = [
        { data: ['B', '2'] },
        { data: ['A', '1'] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Asc,
        sortKey: SortKey.Value,
      });

      expect(sortedData).toEqual([{ data: ['A', '1'] }, { data: ['B', '2'] }]);
    });

    test('should sort series data based on value (date) in ascending order', () => {
      const seriesData = [
        { data: ['B', new Date(2021, 1, 1)] },
        { data: ['A', new Date(2020, 1, 1)] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Asc,
        sortKey: SortKey.Value,
      });

      expect(sortedData).toEqual([
        { data: ['A', new Date(2020, 1, 1)] },
        { data: ['B', new Date(2021, 1, 1)] },
      ]);
    });

    test('should sort series data based on value (number) in descending order', () => {
      const seriesData = [
        { data: ['A', 1] },
        { data: ['B', 2] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Desc,
        sortKey: SortKey.Value,
      });

      expect(sortedData).toEqual([{ data: ['B', 2] }, { data: ['A', 1] }]);
    });

    test('should sort series data based on value (string) in descending order', () => {
      const seriesData = [
        { data: ['A', '1'] },
        { data: ['B', '2'] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Desc,
        sortKey: SortKey.Value,
      });

      expect(sortedData).toEqual([{ data: ['B', '2'] }, { data: ['A', '1'] }]);
    });

    test('should sort series data based on value (date) in descending order', () => {
      const seriesData = [
        { data: ['A', new Date(2020, 1, 1)] },
        { data: ['B', new Date(2021, 1, 1)] },
      ] as SortSeriesDataParams['seriesData'];

      const sortedData = sortSeriesData({
        seriesData,
        sortDirection: SortDirection.Desc,
        sortKey: SortKey.Value,
      });

      expect(sortedData).toEqual([
        { data: ['B', new Date(2021, 1, 1)] },
        { data: ['A', new Date(2020, 1, 1)] },
      ]);
    });
  });
});
