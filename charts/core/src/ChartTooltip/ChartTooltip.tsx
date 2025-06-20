import React, { useEffect } from 'react';
import { renderToString } from 'react-dom/server';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChartContext } from '../ChartContext';
import { CHART_TOOLTIP_CLASSNAME, DEFAULT_TOOLTIP_OPTIONS } from '../constants';

import { getRootStylesText } from './ChartTooltip.styles';
import {
  CallbackSeriesDataPoint,
  ChartTooltipProps,
} from './ChartTooltip.types';
import { CustomTooltip } from './CustomTooltip';

export function ChartTooltip({
  headerFormatter,
  seriesValueFormatter,
  seriesNameFormatter,
  sort,
}: ChartTooltipProps) {
  const {
    chart: {
      id: chartId,
      isChartHovered,
      ready,
      setTooltipMounted,
      tooltipPinned,
      updateOptions,
    },
  } = useChartContext();
  const { darkMode, theme } = useDarkMode();

  useEffect(() => {
    setTooltipMounted(true);

    return () => {
      setTooltipMounted(false);
    };
  }, [setTooltipMounted]);

  useEffect(() => {
    if (!ready) return;

    updateOptions({
      tooltip: {
        /* LOGIC PROPERTIES */
        alwaysShowContent: tooltipPinned,
        confine: true,
        enterable: tooltipPinned,
        renderMode: 'html',
        showContent: isChartHovered || tooltipPinned,
        trigger: 'axis',
        triggerOn: 'none',

        /* STYLING PROPERTIES */
        /**
         * using `extraCssText` instead of `className` because emotion-defined class
         * didn't have high-enough specificity
         */
        className: CHART_TOOLTIP_CLASSNAME,
        extraCssText: getRootStylesText(theme),
        borderWidth: 0,
        padding: 0,
        showDelay: 0,
        hideDelay: 0,
        transitionDuration: 0,
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
              chartId={chartId}
              darkMode={darkMode}
              headerFormatter={headerFormatter}
              seriesData={seriesDataArr}
              seriesNameFormatter={seriesNameFormatter}
              seriesValueFormatter={seriesValueFormatter}
              sort={sort}
              tooltipPinned={tooltipPinned}
            />,
          );
        },
      },
    });

    return () => {
      updateOptions({ ...DEFAULT_TOOLTIP_OPTIONS });
    };
  }, [
    chartId,
    darkMode,
    headerFormatter,
    isChartHovered,
    ready,
    seriesNameFormatter,
    seriesValueFormatter,
    sort,
    theme,
    tooltipPinned,
    updateOptions,
  ]);

  return null;
}
