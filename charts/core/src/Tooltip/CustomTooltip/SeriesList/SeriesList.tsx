import React, { useEffect, useState } from 'react';

import { SeriesListItem } from '../SeriesListItem';

import { SeriesListProps } from './SeriesList.types';
import { sortSeriesData } from './SeriesList.utils';

export function SeriesList({
  seriesData,
  seriesValueFormatter,
  seriesNameFormatter,
  sortDirection,
  sortKey,
}: SeriesListProps) {
  return (
    <>
      {sortSeriesData({ seriesData: seriesData, sortDirection, sortKey }).map(
        ({ seriesName, data, color }) => (
          <SeriesListItem
            key={seriesName}
            seriesName={seriesName}
            data={data}
            color={color}
            seriesValueFormatter={seriesValueFormatter}
            seriesNameFormatter={seriesNameFormatter}
          />
        ),
      )}
    </>
  );
}
