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
  const {
    chart: { ready, updateOptions },
  } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    if (!ready) return;

    updateOptions({
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
      updateOptions({
        tooltip: {
          axisPointer: {
            z: 0, // Prevents dashed emphasis line from being rendered on top of mark lines and labels
          },
          show: true,
          trigger: 'axis',
          formatter: () => '',
        },
      });
    };
  }, [
    ready,
    seriesNameFormatter,
    seriesValueFormatter,
    sort,
    theme,
    updateOptions,
  ]);

  return null;
}
