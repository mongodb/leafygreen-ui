import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { TopLevelFormatterParams } from 'echarts/types/dist/shared';

import { borderRadius, spacing } from '@leafygreen-ui/tokens';

import { useChartContext } from '../ChartContext';

import { AxisFormatterCallbackParams } from './Tooltip.types';
import { TooltipContent } from './TooltipContent';

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
           * Since the formatter trigger is set to 'axis', the params will be an array of objects.
           * Additionally, it should contain axis related data.
           * See https://echarts.apache.org/en/option.html#tooltip.formatter for more info.
           */
          const paramsArr = params as AxisFormatterCallbackParams;

          return renderToString(
            <TooltipContent
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
