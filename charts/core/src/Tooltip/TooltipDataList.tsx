import React, { ReactNode } from 'react';

import { AxisFormatterCallbackParams } from './Tooltip.types';

export function TooltipDataList({
  params,
  seriesValueFormatter,
  seriesNameFormatter,
  sortDirection = 'asc',
  sortValue = 'value',
}: {
  params: AxisFormatterCallbackParams;
  seriesValueFormatter?: (value: string | number | Date) => string | ReactNode;
  seriesNameFormatter?: (seriesName: string) => string | ReactNode;
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
}) {
  const data = [...params];

  // In place sort
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

  const seriesData = data.map(({ seriesName, data, color }) => {
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

    /**
     * Styles can't rely on emotion because this component is rendered in a different context
     * that doesn't have access to the emotion cache. So we need to use inline styles.
     */
    return (
      <React.Fragment key={seriesName}>
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
              backgroundColor: color as string,
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
      </React.Fragment>
    );
  });

  return <>{seriesData}</>;
}