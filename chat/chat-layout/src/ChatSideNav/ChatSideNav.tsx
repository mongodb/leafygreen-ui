import React, { FocusEventHandler, forwardRef, useRef } from 'react';

import {
  CompoundComponent,
  findChild,
} from '@leafygreen-ui/compound-component';
import { useMergeRefs } from '@leafygreen-ui/hooks';
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
    ({ children, className, darkMode: darkModeProp, ...rest }, fwdRef) => {
      const { darkMode, theme } = useDarkMode(darkModeProp);
      const { isPinned, setIsSideNavHovered, shouldRenderExpanded } =
        useChatLayoutContext();
      const navRef = useRef<HTMLElement>(null);
      const ref = useMergeRefs([navRef, fwdRef]);

      const handleMouseEnter = () => {
        setIsSideNavHovered(true);
      };

      const handleMouseLeave = () => {
        setIsSideNavHovered(false);
      };

      const handleFocus: FocusEventHandler<HTMLElement> = ({ target }) => {
        const navElement = navRef.current;

        if (navElement?.contains(target as Node)) {
          setIsSideNavHovered(true);
        }
      };

      const handleBlur: FocusEventHandler<HTMLElement> = ({
        relatedTarget,
      }) => {
        const navElement = navRef.current;

        if (relatedTarget && !navElement?.contains(relatedTarget as Node)) {
          setIsSideNavHovered(false);
        }
      };

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
            onFocus={handleFocus}
            onBlur={handleBlur}
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
