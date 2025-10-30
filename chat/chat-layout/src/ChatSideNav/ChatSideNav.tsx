import React, { forwardRef } from 'react';

import {
  CompoundComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getContainerStyles } from './ChatSideNav.styles';
import {
  type ChatSideNavProps,
  ChatSideNavSubcomponentProperty,
} from './ChatSideNav.types';
import { ChatSideNavContent } from './ChatSideNavContent';
import { ChatSideNavFooter } from './ChatSideNavFooter';
import { ChatSideNavHeader } from './ChatSideNavHeader';

export const ChatSideNav = CompoundComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLElement, ChatSideNavProps>(
    ({ children, className, darkMode: darkModeProp, ...rest }, ref) => {
      const { darkMode, theme } = useDarkMode(darkModeProp);
      // Find subcomponents
      const header = findChild(
        children,
        ChatSideNavSubcomponentProperty.Header,
      );
      const content = findChild(
        children,
        ChatSideNavSubcomponentProperty.Content,
      );

      // Filter out subcomponents from remaining children
      const remainingChildren = filterChildren(
        children,
        Object.values(ChatSideNavSubcomponentProperty),
      );

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <nav
            ref={ref}
            className={getContainerStyles({ className, theme })}
            aria-label="Side navigation"
            {...rest}
          >
            {header}
            {content}
            {remainingChildren}
            <ChatSideNavFooter />
          </nav>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'ChatSideNav',
    Header: ChatSideNavHeader,
    Content: ChatSideNavContent,
  },
);
