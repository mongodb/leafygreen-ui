import { BaseChartGroupProps } from './ChartGroup.types';

export interface ChartGroupContextType extends BaseChartGroupProps {
  /**
   * Whether any Chart instance in a ChartGroup instance is currently hovered.
   */
  isSomeChartHovered: boolean;

  /**
   * Sets the group-level hover state for a ChartGroup instance. Called by each Chart's
   * mouseenter/mouseleave handlers to indicate whether any Chart instance in the
   * group is being hovered.
   */
  setIsSomeChartHovered: (isHovered: boolean) => void;
}
