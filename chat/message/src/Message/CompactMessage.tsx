import React, { forwardRef } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  MessageContainer,
  Variant as MessageContainerVariant,
} from '../MessageContainer';
import { MessageContent } from '../MessageContent';

import {
  avatarContainerStyles,
  getContainerStyles,
} from './CompactMessage.styles';
import { type MessageProps } from './Message.types';

export const CompactMessage = forwardRef<HTMLDivElement, MessageProps>(
  (
    {
      children,
      className,
      isSender = true,
      markdownProps,
      messageBody,
      sourceType,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode();
    const { assistantName } = useLeafyGreenChatContext();

    return (
      <div
        className={getContainerStyles({
          className,
          isSender,
          theme,
        })}
        ref={fwdRef}
        {...rest}
      >
        {!isSender && (
          <div className={avatarContainerStyles}>
            <AssistantAvatar darkMode={darkMode} size={20} />
            <Body weight="semiBold">{assistantName}</Body>
          </div>
        )}
        <MessageContainer
          variant={
            isSender
              ? MessageContainerVariant.Primary
              : MessageContainerVariant.Secondary
          }
        >
          <MessageContent
            sourceType={sourceType}
            baseFontSize={BaseFontSize.Body1}
            {...markdownProps}
          >
            {messageBody ?? ''}
          </MessageContent>
          {children}
        </MessageContainer>
      </div>
    );
  },
);

CompactMessage.displayName = 'CompactMessage';
