/**
 * Static property names used to identify MessageFeed compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const MessageFeedSubcomponentProperty = {
  InitialMessage: 'isLGMessageFeedInitialMessage',
  MessagePrompts: 'isLGMessageFeedMessagePrompts',
  MessagePrompt: 'isLGMessageFeedMessagePrompt',
  ResourceList: 'isLGMessageFeedResourceList',
  ResourceListItem: 'isLGMessageFeedResourceListItem',
} as const;

/**
 * Type representing the possible static property names for MessageFeed subcomponents.
 */
export type MessageFeedSubcomponentProperty =
  (typeof MessageFeedSubcomponentProperty)[keyof typeof MessageFeedSubcomponentProperty];
