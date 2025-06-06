import { TooltipOption } from 'echarts/types/dist/shared';

export const CHART_TOOLTIP_CLASSNAME = 'lg-chart-tooltip';

// Adds vertical dashed line on hover, even when no tooltip is shown
export const DEFAULT_TOOLTIP_OPTIONS = {
  tooltip: {
    axisPointer: {
      z: 0, // Prevents dashed emphasis line from being rendered on top of mark lines and labels
    },
    show: true,
    trigger: 'axis',
    formatter: () => '',
  } as TooltipOption,
};
