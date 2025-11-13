import React, { forwardRef } from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { useChatLayoutContext } from '../ChatLayout/ChatLayoutContext';

import { getContainerStyles, getWrapperStyles } from './ChatSideNav.styles';
import {
  type ChatSideNavProps,
  ChatSideNavSubcomponentProperty,
} from './ChatSideNav.types';
import { ChatSideNavContent } from './ChatSideNavContent';
import { ChatSideNavFooter } from './ChatSideNavFooter';
import { ChatSideNavHeader } from './ChatSideNavHeader';
import { ChatSideNavItem } from './ChatSideNavItem';

export const ChatSideNav = CompoundComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLElement, ChatSideNavProps>(
    ({ children, className, darkMode: darkModeProp, ...rest }, ref) => {
      const { darkMode, theme } = useDarkMode(darkModeProp);
      const { isPinned, setIsSideNavHovered, shouldRenderExpanded } =
        useChatLayoutContext();

      const handleMouseEnter = () => {
        setIsSideNavHovered(true);
      };

      const handleMouseLeave = () => {
        setIsSideNavHovered(false);
      };

      // Find subcomponents
      const header = findChild(
        children,
        ChatSideNavSubcomponentProperty.Header,
      );
      const content = findChild(
        children,
        ChatSideNavSubcomponentProperty.Content,
      );

      const showOverflowShadow = !isPinned && shouldRenderExpanded;

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <nav
            ref={ref}
            className={getWrapperStyles({
              className,
              theme,
            })}
            aria-label="Side navigation"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...rest}
          >
            <div
              className={getContainerStyles({
                shouldRenderExpanded,
                showOverflowShadow,
                theme,
              })}
            >
              {header}
              {content}
              <ChatSideNavFooter />
            </div>
          </nav>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'ChatSideNav',
    Header: ChatSideNavHeader,
    Content: ChatSideNavContent,
    SideNavItem: ChatSideNavItem,
  },
);
