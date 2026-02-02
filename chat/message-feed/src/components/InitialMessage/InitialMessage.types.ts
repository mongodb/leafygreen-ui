import { MessageProps } from '@lg-chat/message';

export interface InitialMessageProps
  extends Omit<MessageProps, 'messageBody' | 'isSender'> {}
