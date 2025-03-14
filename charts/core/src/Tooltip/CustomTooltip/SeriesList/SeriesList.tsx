import React from 'react';

import { SeriesListItem } from '../SeriesListItem';

import { SeriesListProps } from './SeriesList.types';

export function SeriesList({
  params,
  seriesValueFormatter,
  seriesNameFormatter,
  sortDirection = 'asc',
  sortValue = 'value',
}: SeriesListProps) {
  const data = [...params];

  data.sort((a, b) => {
    if (sortValue === 'value') {
      if (
        !Array.isArray(a.data) ||
        !a.data[1] ||
        !Array.isArray(b.data) ||
        !b.data[1]
      ) {
        return 0;
      }

      const valueA = a.data[1];
      const valueB = b.data[1];

      // TODO: Sort's not working
      if (sortDirection === 'desc') {
        return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
      } else {
        return valueA > valueB ? -1 : valueA < valueB ? -1 : 0;
      }
    } else {
      if (
        !Array.isArray(a.data) ||
        !a.data[0] ||
        !Array.isArray(b.data) ||
        !b.data[0]
      ) {
        return 0;
      }

      const nameA = a.data[0];
      const nameB = b.data[0];

      if (sortDirection === 'desc') {
        return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
      } else {
        return nameA > nameB ? 1 : nameA < nameB ? -1 : 0;
      }
    }
  });

  return (
    <>
      {data.map(({ seriesName, data, color }) => (
        <SeriesListItem
          key={seriesName}
          seriesName={seriesName}
          data={data as [string | number, string | number | Date]}
          color={color as string}
          seriesValueFormatter={seriesValueFormatter}
          seriesNameFormatter={seriesNameFormatter}
        />
      ))}
    </>
  );
}
