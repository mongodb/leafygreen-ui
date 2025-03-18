import React from 'react';

import { SeriesListItem } from '../SeriesListItem';

import { SeriesListProps } from './SeriesList.types';

function descendingCompareFn(
  valueA: string | number | Date,
  valueB: string | number | Date,
) {
  if (valueA < valueB) {
    return 1;
  }

  if (valueA > valueB) {
    return -1;
  }

  return 0;
}

export function SeriesList({
  seriesData,
  seriesValueFormatter,
  seriesNameFormatter,
  sort,
}: SeriesListProps) {
  return (
    <>
      {seriesData
        .sort((a, b) => {
          const valueA = a.data[1];
          const valueB = b.data[1];

          if (sort) {
            return sort(
              { name: a.data[0], value: valueA },
              { name: b.data[0], value: valueB },
            );
          }

          return descendingCompareFn(valueA, valueB);
        })
        .map(({ seriesName, data, color }) => (
          <SeriesListItem
            key={seriesName}
            seriesName={seriesName}
            data={data}
            color={color}
            seriesValueFormatter={seriesValueFormatter}
            seriesNameFormatter={seriesNameFormatter}
          />
        ))}
    </>
  );
}
