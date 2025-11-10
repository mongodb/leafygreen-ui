import React, { forwardRef, useMemo } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { filterChildren, findChild } from '@leafygreen-ui/lib';
import { Body } from '@leafygreen-ui/typography';

import { MessageActions } from '../MessageActions';
import { MessageVerifiedBanner } from '../MessageBanner';
import { MessageContent } from '../MessageContent';
import { MessageContext } from '../MessageContext';
import { MessageLinks } from '../MessageLinks';
import { MessagePromotion } from '../MessagePromotion';

import {
  avatarContainerStyles,
  getContainerStyles,
  getMessageContainerStyles,
} from './Message.styles';
import {
  type ActionsType,
  type LinksType,
  type MessageProps,
  MessageSubcomponentProperty,
  type PromotionType,
  type VerifiedBannerType,
} from './Message.types';

const BaseMessage = forwardRef<HTMLDivElement, MessageProps>(
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
                <AssistantAvatar darkMode={darkMode} size={20} />
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
);

BaseMessage.displayName = 'Message';

const Actions = MessageActions as ActionsType;
Actions[MessageSubcomponentProperty.Actions] = true;

const Links = MessageLinks as LinksType;
Links[MessageSubcomponentProperty.Links] = true;

const VerifiedBanner = MessageVerifiedBanner as VerifiedBannerType;
VerifiedBanner[MessageSubcomponentProperty.VerifiedBanner] = true;

const Promotion = MessagePromotion as PromotionType;
Promotion[MessageSubcomponentProperty.Promotion] = true;

export const Message = Object.assign(BaseMessage, {
  Actions,
  Links,
  VerifiedBanner,
  Promotion,
});
