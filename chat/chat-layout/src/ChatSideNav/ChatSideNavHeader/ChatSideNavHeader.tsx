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

import {
  ChatSideNavHeaderProps,
  ChatSideNavSubcomponentProperty,
} from '../ChatSideNav.types';

import {
  getAvatarContainerStyles,
  getButtonStyles,
} from './ChatSideNavHeader.styles';
import { getHeaderStyles } from './ChatSideNavHeader.styles';

export const ChatSideNavHeader = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ChatSideNavHeaderProps>(
    ({ children, className, onClickNewChat, ...rest }, ref) => {
      const { darkMode, theme } = useDarkMode();
      const { assistantName } = useLeafyGreenChatContext();

      return (
        <div ref={ref} className={getHeaderStyles({ className })} {...rest}>
          <div className={getAvatarContainerStyles(theme)}>
            <AssistantAvatar darkMode={darkMode} size={20} />
            <Body weight={FontWeight.SemiBold}>{assistantName}</Body>
          </div>
          {onClickNewChat && (
            <Button
              className={getButtonStyles(theme)}
              leftGlyph={<PlusIcon />}
              onClick={onClickNewChat}
              size={ButtonSize.XSmall}
              variant={ButtonVariant.PrimaryOutline}
            >
              New Chat
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
