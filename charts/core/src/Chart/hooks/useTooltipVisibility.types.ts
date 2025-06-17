export interface UseTooltipVisibilityReturnObj {
  /**
   * Whether the chart is hovered.
   * When charts are grouped, the mousemove events are synced across all
   * charts to render uniformly aligned axis pointers. This boolean is used
   * to determine if the tooltip content should also be displayed or not.
   */
  isChartHovered: boolean;

  /**
   * React dispatch function toggled to true when the tooltip is mounted
   * and false when unmounted.
   */
  setTooltipMounted: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Whether the tooltip is visible and pinned.
   */
  tooltipPinned: boolean;

  /**
   * Callback to hide the tooltip and set the `tooltipPinned` state to false.
   */
  unpinTooltip: () => void;
}
