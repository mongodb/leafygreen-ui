import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color, InteractionState, Variant } from '@leafygreen-ui/tokens';

import { useChartContext } from '../ChartContext';

import {
  CallbackSeriesDataPoint,
  ChartTooltipProps,
} from './ChartTooltip.types';
import { CustomTooltip } from './CustomTooltip';

export function ChartTooltip({
  seriesValueFormatter,
  seriesNameFormatter,
  sort,
}: ChartTooltipProps) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!chart.ready) return;

    /**
     * Some settings are configured in default chart options in order to always
     * render the dashed vertical line on hover, even when no tooltip is shown.
     */
    chart.updateOptions({
      tooltip: {
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
        // Keeps vertical dashed line on hover, even when no tooltip is shown
        tooltip: {
          formatter: () => '',
        },
      });
    };
    // FIXME:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart.ready, sort, theme, seriesNameFormatter, seriesValueFormatter]);

  return null;
}
