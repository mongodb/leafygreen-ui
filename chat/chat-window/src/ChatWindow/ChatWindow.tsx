import React, { ForwardedRef, forwardRef } from 'react';
import { LeafyGreenChatProvider } from '@lg-chat/leafygreen-chat-provider';

import { ChatWindowContents } from './ChatWindowContents';
import { ChatWindowProps } from '.';

export const ChatWindow = forwardRef(
  (
    { children, ...rest }: ChatWindowProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <LeafyGreenChatProvider>
        <ChatWindowContents {...rest} ref={ref}>
          {children}
        </ChatWindowContents>
      </LeafyGreenChatProvider>
    );
  },
);

ChatWindow.displayName = 'ChatWindow';
