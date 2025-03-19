import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { TopLevelFormatterParams } from 'echarts/types/dist/shared';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { useChartContext } from '../ChartContext';

import { CustomTooltip } from './CustomTooltip';
import { CallbackSeriesDataPoint, TooltipProps } from './Tooltip.types';

export function Tooltip({
  seriesValueFormatter,
  seriesNameFormatter,
  sort,
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
        // Still adding background color to prevent peak of color at corners
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
        /**
         * Since the formatter trigger is set to 'axis', the seriesData will be
         * an array of objects. Additionally, it should contain axis related
         * data.
         * See https://echarts.apache.org/en/option.html#tooltip.formatter
         * for more info.
         */
        formatter: (seriesData: Array<CallbackSeriesDataPoint>) => {
          const seriesDataArr = seriesData;

          return renderToString(
            <CustomTooltip
              seriesData={seriesDataArr}
              sort={sort}
              seriesValueFormatter={seriesValueFormatter}
              seriesNameFormatter={seriesNameFormatter}
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
  }, [chart.ready, sort, theme, seriesValueFormatter]);

  return null;
}
