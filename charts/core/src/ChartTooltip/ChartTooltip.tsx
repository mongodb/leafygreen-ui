import React, { useCallback, useEffect, useRef } from 'react';
import { renderToString } from 'react-dom/server';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChartContext } from '../ChartContext';
import {
  useChartGroupHoverContext,
  useChartGroupStableContext,
} from '../ChartGroupContext';
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
  axisPointer = 'line',
  className,
}: ChartTooltipProps) {
  const { isSomeChartHovered } = useChartGroupHoverContext() || {};
  const { enableTooltipSync } = useChartGroupStableContext() || {};
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

  /**
   * Refs to track previous pinned state.
   * Used to prevent unnecessary effect runs when tooltip stays pinned,
   * which would cause ECharts to recreate the tooltip DOM.
   */
  const prevPinnedRef = useRef(false);
  const wasPinnedRef = useRef(false);

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

    /**
     * Skip effect when tooltip stays pinned (both previous and current are true).
     * This prevents ECharts from recreating the tooltip DOM element during
     * parent re-renders, which would make the tooltip disappear.
     */
    const staysPinned = prevPinnedRef.current && tooltipPinned;
    prevPinnedRef.current = tooltipPinned;

    if (staysPinned) {
      return;
    }

    /** Track that we ran the effect while pinned (for cleanup logic) */
    wasPinnedRef.current = tooltipPinned;

    /**
     * Tooltip visibility logic:
     * - `alwaysShowContent`: keeps tooltip present while any grouped chart
     *   is hovered, so tooltips persist on non-hovered charts.
     * - `showContent`: controls whether tooltip content (vs axis pointer only)
     *   is shown. With `enableTooltipSync`, all charts show content when any is
     *   hovered. Without it, only the hovered chart shows content.
     */
    const alwaysShowContent =
      (enableTooltipSync && isSomeChartHovered) || tooltipPinned;
    const showContent = enableTooltipSync
      ? isSomeChartHovered || tooltipPinned
      : isChartHovered || tooltipPinned;

    updateOptions({
      tooltip: {
        /* LOGIC PROPERTIES */
        alwaysShowContent,
        confine: true,
        enterable: tooltipPinned,
        renderMode: 'html',
        showContent,
        trigger: 'axis',
        triggerOn: tooltipPinned ? 'none' : 'mousemove',

        /* STYLING PROPERTIES */
        /**
         * using `extraCssText` instead of `className` because emotion-defined class
         * didn't have high-enough specificity
         *
         */
        className: cx(CHART_TOOLTIP_CLASSNAME, className),
        extraCssText: getRootStylesText(theme),
        borderWidth: 0,
        padding: 0,
        showDelay: 0,
        hideDelay: 0,
        transitionDuration: 0,
        axisPointer: {
          type: axisPointer,
        },

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
      /**
       * Skip cleanup when tooltip is pinned to prevent ECharts from
       * resetting the tooltip DOM during re-renders.
       */
      if (wasPinnedRef.current) {
        return;
      }
      updateOptions({ ...DEFAULT_TOOLTIP_OPTIONS });
    };
  }, [
    enableTooltipSync,
    formatPinnedTooltip,
    formatTooltip,
    isChartHovered,
    isSomeChartHovered,
    ready,
    theme,
    tooltipPinned,
    updateOptions,
    axisPointer,
    className,
  ]);

  return null;
}
