import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  borderRadius,
  color,
  fontFamilies,
  fontWeights,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { useChartCardContext } from '../ChartCard';
import { useChartContext } from '../ChartContext';

import { SortDirection, SortKey, TooltipProps } from './Tooltip.types';
import { getSortOrder, shouldShowTooltip } from './utils';

export function Tooltip({
  sortDirection = SortDirection.Desc,
  sortKey = SortKey.Value,
  valueFormatter,
}: TooltipProps) {
  const { chart } = useChartContext();
  const { theme } = useDarkMode();
  const chartCardContext = useChartCardContext();

  useEffect(() => {
    if (!chart.ready) return;

    chart.updateOptions({
      tooltip: {
        axisPointer: {
          z: 0, // Prevents dashed emphasis line from being rendered on top of mark lines and labels
        },
        backgroundColor:
          color[theme].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        borderRadius: borderRadius[200],
        borderWidth: 0,
        confine: true,
        appendTo: 'body',
        enterable: false,
        hideDelay: 0,
        valueFormatter: valueFormatter
          ? (value: any) => {
              if (typeof value === 'number' || typeof value === 'string') {
                return valueFormatter(value);
              }

              return '';
            }
          : undefined,
        order: getSortOrder(sortDirection, sortKey),
        padding: spacing[200],
        show: shouldShowTooltip({
          chartState: chart.state,
          chartCardState: chartCardContext?.state,
        }),
        showDelay: 0,
        textStyle: {
          fontFamily: fontFamilies.default,
          fontWeight: fontWeights.regular,
          fontSize: 12,
          lineHeight: 20,
          color:
            color[theme].text[Variant.InversePrimary][InteractionState.Default],
        },
        transitionDuration: 0,
        trigger: 'axis',
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
  }, [chart.ready, chart.state, theme, sortDirection, sortKey, valueFormatter]);

  return null;
}
