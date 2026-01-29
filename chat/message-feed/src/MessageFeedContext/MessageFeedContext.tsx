import React, { createContext, useContext } from 'react';

import {
  MessageFeedContextType,
  MessageFeedProviderProps,
} from './MessageFeedContext.types';

export const MessageFeedContext = createContext<MessageFeedContextType | null>(
  null,
);

export const MessageFeedProvider = ({
  children,
  shouldHideInitialMessage = false,
}: MessageFeedProviderProps) => {
  return (
    <MessageFeedContext.Provider value={{ shouldHideInitialMessage }}>
      {children}
    </MessageFeedContext.Provider>
  );
};

export const useMessageFeedContext = () => {
  const context = useContext(MessageFeedContext);

  if (!context) {
    throw new Error(
      'useMessageFeedContext must be used within a MessageFeedProvider',
    );
  }

  return context;
};
