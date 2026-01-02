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

  /**
   * Minimum height of bar in pixels. Ensures small values (including zero) are still visible.
   * Useful when charts have large differences in value magnitudes.
   * @default 1
   */
  barMinHeight?: number;
};

export const Bar = ({
  name,
  data,
  stack,
  hoverBehavior = BarHoverBehavior.None,
  barMinHeight = 1,
}: BarProps) => {
  const options = useCallback<
    (stylingContext: StylingContext) => EChartSeriesOptions['bar']['options']
  >(
    stylingContext => ({
      clip: false,
      stack,
      barMinHeight,
      emphasis: {
        focus: getEmphasisFocus(hoverBehavior),
      },
      itemStyle: {
        color: stylingContext.seriesColor,
      },
    }),
    [stack, hoverBehavior, barMinHeight],
  );

  return <Series type="bar" name={name} data={data} options={options} />;
};

Bar.displayName = 'Bar';
