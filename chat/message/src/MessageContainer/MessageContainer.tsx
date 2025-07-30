import React from 'react';
import {
  useLeafyGreenChatContext,
  Variant as ChatVariant,
} from '@lg-chat/leafygreen-chat-provider';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getMessageContainerStyles } from './MessageContainer.styles';
import { MessageContainerProps } from './MessageContainer.types';
import { Variant } from '.';

export function MessageContainer({
  children,
  className,
  variant = Variant.Primary,
  darkMode: darkModeProp,
  ...rest
}: MessageContainerProps) {
  const { theme } = useDarkMode(darkModeProp);
  const { variant: chatVariant } = useLeafyGreenChatContext();
  const isCompact = chatVariant === ChatVariant.Compact;

  return (
    <div
      className={getMessageContainerStyles({
        className,
        isCompact,
        theme,
        variant,
      })}
      {...rest}
    >
      {children}
    </div>
  );
}

MessageContainer.displayName = 'MessageContainer';
