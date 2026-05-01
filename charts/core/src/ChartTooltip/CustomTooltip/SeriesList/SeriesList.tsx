import React from 'react';
import { SeriesName } from '@lg-charts/series-provider';

import { getDataArray, OptionDataValue } from '../../ChartTooltip.types';
import { SeriesListItem } from '../SeriesListItem';

import { getSeriesListStyles } from './SeriesList.styles';
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
  theme,
  tooltipPinned,
  ...rest
}: SeriesListProps) {
  return (
    <ul className={getSeriesListStyles({ theme, tooltipPinned })} {...rest}>
      {seriesData
        .sort((a, b) => {
          // Extract data arrays from either format (array or object with value property)
          const dataArrayA = getDataArray(a.data) || [];
          const dataArrayB = getDataArray(b.data) || [];
          const [nameA, valueA] = dataArrayA;
          const [nameB, valueB] = dataArrayB;

          if (sort) {
            return sort(
              { name: nameA as SeriesName, value: valueA },
              { name: nameB as SeriesName, value: valueB },
            );
          }

          return descendingCompareFn(valueA, valueB);
        })
        .map(({ seriesName, data, color }) => {
          // Extract data array from either format
          const dataArray = getDataArray(data) || [];
          return (
            <SeriesListItem
              key={seriesName}
              seriesName={seriesName}
              data={dataArray}
              color={color}
              seriesValueFormatter={seriesValueFormatter}
              seriesNameFormatter={seriesNameFormatter}
            />
          );
        })}
    </ul>
  );
}
