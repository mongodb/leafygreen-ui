import React, { forwardRef } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import {
  Button,
  Size as ButtonSize,
  Variant as ButtonVariant,
} from '@leafygreen-ui/button';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import PlusIcon from '@leafygreen-ui/icon/dist/Plus';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { FontWeight } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import { useChatLayoutContext } from '../../ChatLayout/ChatLayoutContext';
import {
  ChatSideNavHeaderProps,
  ChatSideNavSubcomponentProperty,
} from '../ChatSideNav.types';

import {
  buttonChildrenStyles,
  getAssistantNameStyles,
  getAvatarContainerStyles,
  getButtonStyles,
  getButtonTextStyles,
} from './ChatSideNavHeader.styles';
import { getHeaderStyles } from './ChatSideNavHeader.styles';

export const ChatSideNavHeader = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ChatSideNavHeaderProps>(
    ({ children, className, onClickNewChat, ...rest }, ref) => {
      const { darkMode, theme } = useDarkMode();
      const { assistantName } = useLeafyGreenChatContext();
      const { shouldRenderExpanded } = useChatLayoutContext();
      const showNewChatButton = !!onClickNewChat;

      return (
        <div
          ref={ref}
          className={getHeaderStyles({
            className,
            shouldRenderExpanded,
            theme,
          })}
          {...rest}
        >
          <div
            className={getAvatarContainerStyles({
              addBorderBottom: showNewChatButton,
              shouldRenderExpanded,
              theme,
            })}
          >
            <AssistantAvatar darkMode={darkMode} size={20} />
            <Body
              className={getAssistantNameStyles({
                shouldRender: shouldRenderExpanded,
              })}
              weight={FontWeight.SemiBold}
            >
              {assistantName}
            </Body>
          </div>
          {showNewChatButton && (
            <Button
              className={getButtonStyles(theme)}
              onClick={onClickNewChat}
              size={ButtonSize.XSmall}
              variant={ButtonVariant.PrimaryOutline}
            >
              <div className={buttonChildrenStyles}>
                <PlusIcon size="default" />
                <span
                  className={getButtonTextStyles({
                    shouldRender: shouldRenderExpanded,
                  })}
                >
                  New Chat
                </span>
              </div>
            </Button>
          )}
          {children}
        </div>
      );
    },
  ),
  {
    displayName: 'ChatSideNavHeader',
    key: ChatSideNavSubcomponentProperty.Header,
  },
);
