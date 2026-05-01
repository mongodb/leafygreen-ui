import { MessageProps } from '@lg-chat/message';

export interface InitialMessageProps
  extends Omit<
    MessageProps,
    'messageBody' | 'isSender' | 'sourceType' | 'markdownProps'
  > {}

/**
 * Static property names used to identify InitialMessage compound components.
 * These are implementation details for the compound component pattern and should not be exported.
 */
export const InitialMessageSubcomponentProperty = {
  MessagePrompts: 'isLGInitialMessageMessagePrompts',
  MessagePromptsItem: 'isLGInitialMessageMessagePromptsItem',
  ResourceList: 'isLGInitialMessageResourceList',
  ResourceListItem: 'isLGInitialMessageResourceListItem',
} as const;

/**
 * Type representing the possible static property names for InitialMessage subcomponents.
 */
export type InitialMessageSubcomponentProperty =
  (typeof InitialMessageSubcomponentProperty)[keyof typeof InitialMessageSubcomponentProperty];
