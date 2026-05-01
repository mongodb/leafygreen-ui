import { PropsWithChildren } from 'react';

export interface MessageFeedContextType {
  shouldHideInitialMessage: boolean;
}

export interface MessageFeedProviderProps
  extends PropsWithChildren<MessageFeedContextType> {}
