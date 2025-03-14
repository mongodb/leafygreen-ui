import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getContainerStyles, getHeaderStyles } from './CustomTooltip.styles';
import { CustomTooltipProps } from './CustomTooltip.types';
import { SeriesList } from './SeriesList';

function formatDate(dateTimeStamp: number) {
  const date = new Date(dateTimeStamp);
  const formattedYear = date.getFullYear();
  const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
  const formattedDay = String(date.getDate()).padStart(2, '0');
  const formattedHour = String(date.getHours()).padStart(2, '0');
  const formattedMinute = String(date.getMinutes()).padStart(2, '0');
  const formattedSecond = String(date.getSeconds()).padStart(2, '0');
  const formattedDate = `${formattedYear}/${formattedMonth}/${formattedDay}`;
  const formattedTime = `${formattedHour}:${formattedMinute}:${formattedSecond}`;

  return `${formattedDate}/${formattedTime}`;
}

export function CustomTooltip({
  params,
  seriesValueFormatter,
  seriesNameFormatter,
  sortDirection,
  sortValue,
}: CustomTooltipProps) {
  const { theme } = useDarkMode();

  if (params.length === 0 || !params[0].data[0]) {
    return null;
  }

  const axisValueLabel =
    params[0].axisType === 'xAxis.time'
      ? formatDate(params[0].axisValue as number) // Should be num since axisType is time
      : params[0].axisValueLabel;

  return (
    <div className={getContainerStyles(theme)}>
      <div className={getHeaderStyles(theme)}>{axisValueLabel}</div>
      <SeriesList
        params={params}
        seriesValueFormatter={seriesValueFormatter}
        seriesNameFormatter={seriesNameFormatter}
        sortDirection={sortDirection}
        sortValue={sortValue}
      />
    </div>
  );
}
