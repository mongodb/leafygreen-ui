export interface ChartGroupProviderProps {
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

/**
 * Stable context values that rarely change (groupId, enableTooltipSync).
 * Used by Chart components to avoid re-renders on hover state changes.
 */
export interface ChartGroupStableContextType extends ChartGroupProviderProps {
  /**
   * Sets the group-level hover state for a ChartGroup instance. Called by each Chart's
   * mouseenter/mouseleave handlers to indicate whether any Chart instance in the
   * group is being hovered.
   */
  setIsSomeChartHovered: (isHovered: boolean) => void;
}

/**
 * Hover context value that changes frequently.
 * Used by ChartTooltip to update tooltip visibility without causing Chart re-renders.
 */
export interface ChartGroupHoverContextType {
  /**
   * Whether any Chart instance in a ChartGroup instance is currently hovered.
   */
  isSomeChartHovered: boolean;
}

/**
 * Combined context type for convenience.
 */
export interface ChartGroupContextType
  extends ChartGroupStableContextType,
    ChartGroupHoverContextType {}
