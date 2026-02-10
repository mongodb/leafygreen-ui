export interface BaseChartGroupProps {
  /**
   * Unique identifier for the chart group. Used by ECharts `connect` to
   * synchronize axis pointers across grouped charts.
   */
  groupId: string;

  /**
   * Whether tooltip content is synchronized across all charts in the group.
   * When `true`, hovering any chart shows tooltip content on all grouped charts.
   * When `false`, only the hovered chart shows tooltip content; other charts
   * show only the axis pointer.
   * @default true
   */
  enableTooltipSync?: boolean;
}
