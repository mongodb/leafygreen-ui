import React, { forwardRef } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { filterChildren, findChild } from '@leafygreen-ui/lib';
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
import {
  type MessageProps,
  MessageSubcomponentProperty,
} from './Message.types';

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

    // Find subcomponents
    const actions = findChild(children, MessageSubcomponentProperty.Actions);
    const verifiedBanner = findChild(
      children,
      MessageSubcomponentProperty.VerifiedBanner,
    );
    const links = findChild(children, MessageSubcomponentProperty.Links);
    const promotion = findChild(
      children,
      MessageSubcomponentProperty.Promotion,
    );

    // Filter out subcomponents from children
    const remainingChildren = filterChildren(
      children,
      Object.values(MessageSubcomponentProperty),
    );

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
          {promotion}
          {actions}
          {verifiedBanner}
          {links}
          {remainingChildren}
        </MessageContainer>
      </div>
    );
  },
);

CompactMessage.displayName = 'CompactMessage';
