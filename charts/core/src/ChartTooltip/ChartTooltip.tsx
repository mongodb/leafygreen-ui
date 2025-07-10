import React, { useCallback, useEffect } from 'react';
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
      enableGroupTooltipSync,
      id: chartId,
      isChartHovered,
      ready,
      setTooltipMounted,
      tooltipPinned,
      updateOptions,
    },
  } = useChartContext();
  const { darkMode, theme } = useDarkMode();

  const formatTooltip = useCallback(
    (seriesData: Array<CallbackSeriesDataPoint>) => {
      return renderToString(
        <CustomTooltip
          chartId={chartId}
          darkMode={darkMode}
          headerFormatter={headerFormatter}
          seriesData={seriesData}
          seriesNameFormatter={seriesNameFormatter}
          seriesValueFormatter={seriesValueFormatter}
          sort={sort}
          tooltipPinned={tooltipPinned}
        />,
      );
    },
    [
      chartId,
      darkMode,
      headerFormatter,
      seriesNameFormatter,
      seriesValueFormatter,
      sort,
      tooltipPinned,
    ],
  );

  const formatPinnedTooltip = useCallback(
    (seriesData: Array<CallbackSeriesDataPoint>) => {
      /**
       * 1. Get the scrollable list in pinned tooltip before `renderToString` is called
       * to preserve the scroll position.
       */
      const scrollEl = document.querySelector(`ul[data-chartid="${chartId}"]`);
      const scrollTop = scrollEl ? scrollEl.scrollTop : 0;

      /**
       * 2. Render the new custom tooltip HTML. Doing this will always reset the scroll
       * position of the scrollable list, so we need to restore it after rendering.
       */
      const html = formatTooltip(seriesData);

      /**
       * 3. After render, re-apply stored scroll position to the scrollable list
       */
      requestAnimationFrame(() => {
        const newScrollEl = document.querySelector(
          `ul[data-chartid="${chartId}"]`,
        );

        if (newScrollEl) {
          newScrollEl.scrollTop = scrollTop;
        }
      });

      return html;
    },
    [chartId, formatTooltip],
  );

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
        alwaysShowContent: enableGroupTooltipSync || tooltipPinned,
        confine: true,
        enterable: tooltipPinned,
        renderMode: 'html',
        showContent: enableGroupTooltipSync || isChartHovered || tooltipPinned,
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
        formatter: tooltipPinned ? formatPinnedTooltip : formatTooltip,
      },
    });

    return () => {
      updateOptions({ ...DEFAULT_TOOLTIP_OPTIONS });
    };
  }, [
    enableGroupTooltipSync,
    formatPinnedTooltip,
    formatTooltip,
    isChartHovered,
    ready,
    theme,
    tooltipPinned,
    updateOptions,
  ]);

  return null;
}
