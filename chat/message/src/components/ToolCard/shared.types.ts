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
