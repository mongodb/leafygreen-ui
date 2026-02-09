import { createContext, useContext } from 'react';

import { ChartGroupContextType } from './ChartGroupContext.types';

export const ChartGroupContext = createContext<
  ChartGroupContextType | undefined
>(undefined);

/**
 * Returns the ChartGroup context if the chart is within a ChartGroup,
 * or `undefined` if not. This allows Chart and ChartTooltip to
 * conditionally adapt behavior based on group membership.
 */
export const useChartGroupContext = (): ChartGroupContextType | undefined => {
  return useContext(ChartGroupContext);
};
