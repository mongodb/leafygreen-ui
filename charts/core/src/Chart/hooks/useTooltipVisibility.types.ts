export interface UseTooltipVisibilityReturnObj {
  foo: boolean;

  /**
   * React dispatch function toggled to true when the tooltip is mounted
   * and false when unmounted.
   */
  setTooltipMounted: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Whether the tooltip is visible and pinned.
   */
  tooltipPinned: boolean;

  tooltipPos: number[];
}
