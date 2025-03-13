import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { TopLevelFormatterParams } from 'echarts/types/dist/shared';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  borderRadius,
  color,
  // fontFamilies,
  // fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { useChartCardContext } from '../ChartCard';
import { useChartContext } from '../ChartContext';

import {
  AxisFormatterCallbackParams,
  SortDirection,
  SortKey,
  TooltipProps,
} from './Tooltip.types';
// import { getSortOrder } from './utils';
import { TooltipContent } from './TooltipContent';

export function Tooltip({
  sortDirection = SortDirection.Desc,
  sortKey = SortKey.Value,
  valueFormatter,
}: TooltipProps) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!chart.ready) return;

    chart.updateOptions({
      tooltip: {
        axisPointer: {
          z: 0, // Prevents dashed emphasis line from being rendered on top of mark lines and labels
        },
        show: true,
        trigger: 'axis',
        backgroundColor:
          color[theme].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        borderWidth: 0,
        enterable: false,
        confine: true,
        appendTo: 'body',
        showDelay: 0,
        hideDelay: 0,
        transitionDuration: 0,
        padding: 0,
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
              sortValue={sortKey}
            />,
          );
        },
      },
    });

    return () => {
      chart.updateOptions({
        tooltip: {
          show: false,
        },
      });
    };
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.ready, chart.state, sortDirection, sortKey, valueFormatter]);

  return null;
}
