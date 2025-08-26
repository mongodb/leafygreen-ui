import React, { ForwardedRef, forwardRef } from 'react';

import { ChatWindowContents } from './ChatWindowContents';
import { ChatWindowProps } from '.';

export const ChatWindow = forwardRef(
  (
    { children, ...rest }: ChatWindowProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <ChatWindowContents {...rest} ref={ref}>
        {children}
      </ChatWindowContents>
    );
  },
);

ChatWindow.displayName = 'ChatWindow';
