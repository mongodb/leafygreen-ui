import React, { PropsWithChildren, useMemo, useState } from 'react';

import {
  ChartGroupHoverContext,
  ChartGroupStableContext,
} from './ChartGroupContext';
import { ChartGroupProviderProps } from './ChartGroupContext.types';

export function ChartGroupProvider({
  children,
  enableTooltipSync = true,
  groupId,
}: PropsWithChildren<ChartGroupProviderProps>) {
  const [isSomeChartHovered, setIsSomeChartHovered] = useState(false);

  /**
   * Stable context value that only changes when groupId or enableTooltipSync change.
   * The setIsSomeChartHovered function is intentionally NOT in the dependency array
   * because it's a stable setter function from useState.
   */
  const stableContextValue = useMemo(
    () => ({
      enableTooltipSync,
      groupId,
      setIsSomeChartHovered,
    }),
    [enableTooltipSync, groupId],
  );

  /**
   * Hover context value that changes frequently when a descendant chart is hovered.
   * Separated from stable context to prevent unnecessary re-renders of
   * Chart components that don't need hover state.
   */
  const hoverContextValue = useMemo(
    () => ({
      isSomeChartHovered,
    }),
    [isSomeChartHovered],
  );

  return (
    <ChartGroupStableContext.Provider value={stableContextValue}>
      <ChartGroupHoverContext.Provider value={hoverContextValue}>
        {children}
      </ChartGroupHoverContext.Provider>
    </ChartGroupStableContext.Provider>
  );
}

ChartGroupProvider.displayName = 'ChartGroupProvider';
