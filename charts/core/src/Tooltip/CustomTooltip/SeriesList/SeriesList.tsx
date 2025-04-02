import React from 'react';
import { SeriesName } from '@lg-charts/series-provider';

import { OptionDataValue } from '../../Tooltip.types';
import { SeriesListItem } from '../SeriesListItem';

import { SeriesListProps } from './SeriesList.types';

function descendingCompareFn(valueA: OptionDataValue, valueB: OptionDataValue) {
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
          const [nameA, valueA] = a.data;
          const [nameB, valueB] = b.data;

          if (sort) {
            return sort(
              { name: nameA as SeriesName, value: valueA },
              { name: nameB as SeriesName, value: valueB },
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
