import React, { forwardRef, useMemo } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import {
  CompoundComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { MessageActions } from '../MessageActions';
import { MessageContent } from '../MessageContent';
import { MessageContext } from '../MessageContext';
import { MessageLinks } from '../MessageLinks';
import { MessagePromotion } from '../MessagePromotion';
import { MessageVerifiedBanner } from '../MessageVerifiedBanner';
import { MessageSubcomponentProperty } from '../shared.types';

import {
  avatarContainerStyles,
  getContainerStyles,
  getMessageContainerStyles,
} from './Message.styles';
import { type MessageProps } from './Message.types';

export const Message = CompoundComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, MessageProps>(
    (
      {
        children,
        className,
        darkMode: darkModeProp,
        isSender = true,
        markdownProps,
        messageBody,
        sourceType,
        ...rest
      },
      fwdRef,
    ) => {
      const { darkMode, theme } = useDarkMode(darkModeProp);
      const { assistantName } = useLeafyGreenChatContext();

      const contextValue = useMemo(
        () => ({
          messageBody,
        }),
        [messageBody],
      );

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
        <LeafyGreenProvider darkMode={darkMode}>
          <MessageContext.Provider value={contextValue}>
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
                  <AssistantAvatar size={20} />
                  <Body weight="semiBold">{assistantName}</Body>
                </div>
              )}
              <div
                className={getMessageContainerStyles({
                  isSender,
                  theme,
                })}
              >
                <MessageContent sourceType={sourceType} {...markdownProps}>
                  {messageBody ?? ''}
                </MessageContent>
                {promotion}
                {actions}
                {verifiedBanner}
                {links}
                {remainingChildren}
              </div>
            </div>
          </MessageContext.Provider>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'Message',
    Actions: MessageActions,
    Links: MessageLinks,
    VerifiedBanner: MessageVerifiedBanner,
    Promotion: MessagePromotion,
  },
);
