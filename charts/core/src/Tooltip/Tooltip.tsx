import { useEffect } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  borderRadius,
  color,
  InteractionState,
  spacing,
  Variant,
} from '@leafygreen-ui/tokens';

import { useChartContext } from '../ChartContext';

import { TooltipProps } from './Tooltip.types';

export function Tooltip({
  sortDirection = 'desc',
  sortKey = 'value',
  valueFormatter = value => `${value} GB`,
}: TooltipProps) {
  const { updateChartOptions } = useChartContext();
  const { theme } = useDarkMode();

  useEffect(() => {
    let sortOrder: 'valueDesc' | 'valueAsc' | 'seriesDesc' | 'seriesAsc' =
      'valueDesc';

    if (sortDirection === 'asc') {
      if (sortKey === 'name') {
        sortOrder = 'seriesAsc';
      }
      sortOrder = 'valueAsc';
    } else {
      if (sortKey === 'name') {
        sortOrder = 'seriesDesc';
      }
    }

    updateChartOptions({
      tooltip: {
        show: true,
        backgroundColor:
          color[theme].background[Variant.InversePrimary][
            InteractionState.Default
          ],
        borderRadius: borderRadius[200],
        borderWidth: 0,
        confine: true,
        enterable: false,
        hideDelay: 0,
        valueFormatter: valueFormatter
          ? value => {
              if (typeof value === 'number' || typeof value === 'string') {
                return valueFormatter(value);
              }

              return '';
            }
          : undefined,
        order: sortOrder,
        padding: spacing[200],
        showDelay: 0,
        textStyle: {
          fontFamily: 'Euclid Circular A Light, sans-serif',
          fontSize: 12,
          fontWeight: 'lighter',
          color:
            color[theme].text[Variant.InversePrimary][InteractionState.Default],
        },
        trigger: 'axis',
      },
    });

    return () => {
      updateChartOptions({
        tooltip: {
          show: false,
        },
      });
    };
  }, [theme, sortDirection, sortKey, valueFormatter, updateChartOptions]);

  return null;
}
