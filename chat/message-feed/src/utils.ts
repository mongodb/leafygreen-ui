import { MessageSourceType } from '@lg-chat/message';
import { MessageRatingProps } from '@lg-chat/message-rating';

interface MessageFieldsBase {
  id?: string | number;
  messageBody: string;
  sourceType?: MessageSourceType;
}

export type UserMessageFields = MessageFieldsBase & {
  userName: string;
  isMongo?: never;
  messageRatingProps?: never;
};

export type MongoMessageFields = MessageFieldsBase & {
  userName?: never;
  isMongo: true;
  messageRatingProps?: MessageRatingProps;
};

export type MessageFields = UserMessageFields | MongoMessageFields;

export function isMongoMessage(
  message: MessageFields,
): message is MongoMessageFields {
  return 'isMongo' in message && message.isMongo === true;
}

export function shouldRenderRatings(message: MessageFields) {
  return isMongoMessage(message) && !!message.messageRatingProps;
}
