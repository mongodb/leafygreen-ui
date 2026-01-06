import React, { useCallback } from 'react';

import { enforceExhaustive } from '@leafygreen-ui/lib';

import { EChartSeriesOptions, StylingContext } from '../../Echart/Echart.types';
import { Series } from '../Series';
import { SeriesProps } from '../Series.types';

export const BarHoverBehavior = {
  DimOthers: 'dim-others',
  None: 'none',
} as const;

export type BarHoverBehavior =
  (typeof BarHoverBehavior)[keyof typeof BarHoverBehavior];

function getEmphasisFocus(hoverBehavior: BarHoverBehavior) {
  switch (hoverBehavior) {
    case BarHoverBehavior.DimOthers:
      return 'self';
    case BarHoverBehavior.None:
      return 'none';
    default:
      return enforceExhaustive(hoverBehavior);
  }
}

export type BarProps = SeriesProps & {
  /**
   * Stack name for the series. Series with the same stack name are stacked together.
   */
  stack?: string;

  /**
   * Hover focus behavior for the series.
   * - `dim-others`: Upon hovering over a bar, all other bars will be dimmed.
   * - `none`: Other bars will not be affected by the hover. (default)
   */
  hoverBehavior?: BarHoverBehavior;
};

export const Bar = ({
  name,
  data,
  stack,
  hoverBehavior = BarHoverBehavior.None,
}: BarProps) => {
  // Transform data to apply opacity to zero values only
  const transformedData = React.useMemo(() => {
    return data.map(([x, y]) => {
      const value = y as number;

      // Apply 30% opacity (0.3) to zero values to differentiate from 1px minimum height
      if (value === 0) {
        return {
          value: [x, y],
          itemStyle: {
            opacity: 0.3,
          },
        };
      }

      // Keep non-zero values in array format for tooltip compatibility
      return [x, y];
    });
  }, [data]);

  const options = useCallback<
    (stylingContext: StylingContext) => EChartSeriesOptions['bar']['options']
  >(
    stylingContext => ({
      clip: false,
      stack,
      barMinHeight: 1,
      emphasis: {
        focus: getEmphasisFocus(hoverBehavior),
      },
      itemStyle: {
        color: stylingContext.seriesColor,
      },
    }),
    [stack, hoverBehavior],
  );

  return (
    <Series type="bar" name={name} data={transformedData} options={options} />
  );
};

Bar.displayName = 'Bar';
