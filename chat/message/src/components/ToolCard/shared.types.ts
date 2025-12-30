/**
 * State enum for tool interaction lifecycle states
 */
export const State = {
  Canceled: 'canceled',
  Error: 'error',
  Idle: 'idle',
  Running: 'running',
  Success: 'success',
} as const;
export type State = (typeof State)[keyof typeof State];

/**
 * Static property names used to identify ToolCard compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const ToolCardSubcomponentProperty = {
  Actions: 'isLGToolCardActions',
  ExpandableContent: 'isLGToolCardExpandableContent',
} as const;

/**
 * Type representing the possible static property names for ToolCard subcomponents.
 */
export type ToolCardSubcomponentProperty =
  (typeof ToolCardSubcomponentProperty)[keyof typeof ToolCardSubcomponentProperty];
