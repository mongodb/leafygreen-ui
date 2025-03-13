import React, { ReactNode } from 'react';

import { TooltipSeriesListItemProps } from './TooltipSeriesListItem.types';

export const TooltipSeriesListItem = ({
  seriesName,
  data,
  color,
  seriesNameFormatter,
  seriesValueFormatter,
}: TooltipSeriesListItemProps) => {
  let name: string | ReactNode = seriesName;

  if (seriesName && seriesNameFormatter) {
    name = seriesNameFormatter(seriesName);
  }

  let value: string | ReactNode = '';

  if (Array.isArray(data) && data[1]) {
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
  }

  return (
    <>
      <div
        style={{
          textAlign: 'left',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            marginRight: '5px',
            borderRadius: '50%',
            width: '10px',
            height: '10px',
            backgroundColor: color,
          }}
        ></span>
        {name}
      </div>
      <div
        style={{
          textAlign: 'right',
          fontFamily: 'Euclid Circular A, sans-serif',
          fontWeight: 'bold',
        }}
      >
        {value}
      </div>
    </>
  );
};
