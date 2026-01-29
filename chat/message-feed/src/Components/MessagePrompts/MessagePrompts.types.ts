import { type MessagePromptsProps as LGMessagePromptsProps } from '@lg-chat/message-prompts';

export type MessagePromptsProps = Omit<
  LGMessagePromptsProps,
  'enableHideOnSelect'
>;
