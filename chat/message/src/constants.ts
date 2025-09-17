/**
 * Static property names used to identify Message compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const MessageSubcomponentProperty = {
  Actions: 'isLGMessageActions',
  VerifiedBanner: 'isLGMessageVerifiedBanner',
  Links: 'isLGMessageLinks',
  Promotion: 'isLGMessagePromotion',
} as const;

/**
 * Type representing the possible static property names for Message subcomponents.
 */
export type MessageSubcomponentProperty =
  (typeof MessageSubcomponentProperty)[keyof typeof MessageSubcomponentProperty];
