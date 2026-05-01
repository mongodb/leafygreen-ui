import { createContext, useContext } from 'react';

import {
  ChartGroupHoverContextType,
  ChartGroupStableContextType,
} from './ChartGroupContext.types';

/**
 * Context for stable ChartGroup values.
 * These values rarely change, so subscribing to this context won't cause
 * re-renders on hover state changes.
 */
export const ChartGroupStableContext = createContext<
  ChartGroupStableContextType | undefined
>(undefined);

/**
 * Context for ChartGroup hover state.
 * This value changes frequently when a descendant chart is hovered, so only components
 * that need to react to hover changes should subscribe to this context.
 */
export const ChartGroupHoverContext = createContext<
  ChartGroupHoverContextType | undefined
>(undefined);

/**
 * Returns the stable ChartGroup context if the chart is within a ChartGroup,
 * or `undefined` if not. Use this hook in components that don't need to
 * re-render on hover state changes.
 */
export const useChartGroupStableContext = ():
  | ChartGroupStableContextType
  | undefined => {
  return useContext(ChartGroupStableContext);
};

/**
 * Returns the hover state from ChartGroup context if the chart is within
 * a ChartGroup, or `undefined` if not. Use this hook in components that
 * need to react to hover state changes.
 */
export const useChartGroupHoverContext = ():
  | ChartGroupHoverContextType
  | undefined => {
  return useContext(ChartGroupHoverContext);
};
