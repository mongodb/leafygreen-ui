import React, { ReactNode } from 'react';

import { AxisFormatterCallbackParams } from './Tooltip.types';
import { TooltipDataList } from './TooltipDataList';

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

export function TooltipContent({
  params,
  seriesValueFormatter,
  seriesNameFormatter,
  sortDirection,
  sortValue,
}: {
  params: AxisFormatterCallbackParams;
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
  seriesValueFormatter?: (value: string | number | Date) => string | ReactNode;
  seriesNameFormatter?: (seriesName: string) => string | ReactNode;
}) {
  if (
    params.length === 0 ||
    !Array.isArray(params[0].data) ||
    !params[0].data[0]
  ) {
    return null;
  }

  const axisValueLabel =
    params[0].axisType === 'xAxis.time'
      ? formatDate(params[0].axisValue as number) // Should be num since axisType is time
      : params[0].axisValueLabel;

  /**
   * Styles can't rely on emotion because this component is rendered in a different context
   * that doesn't have access to the emotion cache. So we need to use inline styles.
   */
  return (
    <div
      style={{
        color: 'white',
        padding: '12px',
        borderRadius: '5px',
        fontFamily: 'Euclid Circular A Light, sans-serif',
        fontWeight: 'lighter',
      }}
    >
      <div
        style={{
          textAlign: 'left',
          display: 'block',
          marginBottom: '8px',
        }}
      >
        {axisValueLabel}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto',
          rowGap: '8px',
          columnGap: '24px',
        }}
      >
        {
          <TooltipDataList
            params={params}
            seriesValueFormatter={seriesValueFormatter}
            seriesNameFormatter={seriesNameFormatter}
            sortDirection={sortDirection}
            sortValue={sortValue}
          />
        }
      </div>
    </div>
  );
}