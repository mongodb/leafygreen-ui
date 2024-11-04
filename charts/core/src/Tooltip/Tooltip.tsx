import React, { ReactNode, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import {
  CallbackDataParams,
  TopLevelFormatterParams,
} from 'echarts/types/dist/shared';

import { borderRadius, spacing } from '@leafygreen-ui/tokens';

import { useChartContext } from '../ChartContext';

/**
 * Since the formatter trigger is set to 'axis', the params will be an array of objects.
 * Additionally, it should contain axis related data.
 * See https://echarts.apache.org/en/option.html#tooltip.formatter for more info.
 */
type AxisFormatterCallbackParams = Array<
  CallbackDataParams & {
    axisDim: string;
    axisId: string;
    axisIndex: number;
    axisType: string;
    axisValue: string | number;
    axisValueLabel: string | number;
  }
>;

function TooltipComponent({
  params,
  valueFormatter,
  seriesNameFormatter,
  sortDirection,
  sortValue,
}: {
  params: AxisFormatterCallbackParams;
  valueFormatter?: (value: string | number | Date) => string | ReactNode;
  seriesNameFormatter?: (seriesName: string) => string | ReactNode;
  sortDirection: 'asc' | 'desc';
  sortValue: 'name' | 'value';
}) {
  if (
    params.length === 0 ||
    !Array.isArray(params[0].data) ||
    !params[0].data[0]
  ) {
    return null;
  }

  let axisValueLabel = params[0].axisValueLabel;

  if (params[0].axisType === 'xAxis.time') {
    const date = new Date(params[0].axisValue as number); // Should be num since axisType is time
    const formattedYear = date.getFullYear();
    const formattedMonth = String(date.getMonth() + 1).padStart(2, '0');
    const formattedDay = String(date.getDate()).padStart(2, '0');
    const formattedHour = String(date.getHours()).padStart(2, '0');
    const formattedMinute = String(date.getMinutes()).padStart(2, '0');
    const formattedSecond = String(date.getSeconds()).padStart(2, '0');

    axisValueLabel = `${formattedYear}/${formattedMonth}/${formattedDay}/${formattedHour}:${formattedMinute}:${formattedSecond}`;
  }

  // In place sort
  params.sort((a, b) => {
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

      return sortDirection === 'desc' ? valueB - valueA : valueA - valueB;
    } else {
      if (
        !Array.isArray(a.data) ||
        !a.data[0] ||
        !Array.isArray(b.data) ||
        !b.data[0]
      ) {
        return 0;
      }

      const nameA = a.data[1];
      const nameB = b.data[1];

      return sortDirection === 'desc' ? nameB - nameA : nameA - nameB;
    }
  });

  const seriesData = params.map(({ seriesName, data, color }) => {
    let name: string | ReactNode = seriesName;

    if (seriesName && seriesNameFormatter) {
      name = seriesNameFormatter(seriesName);
    }

    let value: string | ReactNode = '';

    if (Array.isArray(data) && data[1]) {
      if (valueFormatter) {
        value = valueFormatter(data[1]);
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
        {seriesData}
      </div>
    </div>
  );
}

export function Tooltip({
  sortDirection = 'desc',
  sortValue = 'value',
}: {
  sortDirection?: 'asc' | 'desc';
  sortValue?: 'name' | 'value';
}) {
  const { updateChartOptions } = useChartContext();

  useEffect(() => {
    updateChartOptions({
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#001E2B',
        borderRadius: borderRadius[200],
        padding: spacing[150],
        enterable: false,
        confine: true,
        showDelay: 0,
        hideDelay: 0,
        formatter: (params: TopLevelFormatterParams) => {
          /**
           * Since the trigger is set to 'axis', the params will be an array of objects.
           * See https://echarts.apache.org/en/option.html#tooltip.formatter for more info.
           */
          const paramsArr = params as AxisFormatterCallbackParams;
          return renderToString(
            <TooltipComponent
              params={paramsArr}
              sortDirection={sortDirection}
              sortValue={sortValue}
            />,
          );
        },
      },
    });
  }, []);
  return null;
}
