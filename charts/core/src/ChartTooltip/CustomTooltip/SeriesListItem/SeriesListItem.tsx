import React, { ReactNode } from 'react';

import { SeriesListItemColorDot } from '../SeriesListItemColorDot';

import { containerStyle, nameStyle, valueStyle } from './SeriesListItem.styles';
import { SeriesListItemProps } from './SeriesListItem.types';

export const SeriesListItem = ({
  seriesName,
  data,
  color,
  seriesNameFormatter,
  seriesValueFormatter,
}: SeriesListItemProps) => {
  let name: string | ReactNode = seriesName;

  if (seriesName && seriesNameFormatter) {
    name = seriesNameFormatter(seriesName);
  }

  let value: string | ReactNode = '';

  if (seriesValueFormatter) {
    value = seriesValueFormatter(data[1]);
  } else {
    // default value formatting
    if (data[1] instanceof Date) {
      value = data[1].toLocaleDateString();
    } else {
      value = data[1];
    }
  }

  return (
    <li className={containerStyle}>
      <div className={nameStyle}>
        <SeriesListItemColorDot color={color} />
        {name}
      </div>
      <div className={valueStyle}>{value}</div>
    </li>
  );
};
