import { SeriesListProps } from './SeriesList.types';

export interface SortSeriesDataParams {
  seriesData: SeriesListProps['seriesData'];
  sortDirection: SeriesListProps['sortDirection'];
  sortKey: SeriesListProps['sortKey'];
}

/**
 * Returns a new sorted copy of the series data based on the specified sort
 * direction and sort value.
 */
export function sortSeriesData({
  seriesData,
  sortDirection,
  sortKey,
}: SortSeriesDataParams) {
  const updatedData = [...seriesData];

  return updatedData.sort((a, b) => {
    const aValue = sortKey === 'name' ? a.data[0] : a.data[1];
    const bValue = sortKey === 'name' ? b.data[0] : b.data[1];

    if (aValue < bValue) {
      return sortDirection === 'asc' ? -1 : 1;
    }

    if (aValue > bValue) {
      return sortDirection === 'asc' ? 1 : -1;
    }

    return 0;
  });
}
