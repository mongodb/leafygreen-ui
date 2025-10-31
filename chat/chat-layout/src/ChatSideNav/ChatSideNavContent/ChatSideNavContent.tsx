import React, { forwardRef } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import ClockWithArrowIcon from '@leafygreen-ui/icon/dist/ClockWithArrow';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Overline } from '@leafygreen-ui/typography';

import {
  ChatSideNavContentProps,
  ChatSideNavSubcomponentProperty,
} from '../ChatSideNav.types';

import {
  contentHeaderStyles,
  getContentStyles,
  getIconFill,
} from './ChatSideNavContent.styles';

export const ChatSideNavContent = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ChatSideNavContentProps>(
    ({ children, className, ...rest }, ref) => {
      const { theme } = useDarkMode();

      const sideNavItems = findChildren(
        children,
        ChatSideNavSubcomponentProperty.SideNavItem,
      );

      return (
        <div ref={ref} className={getContentStyles({ className })} {...rest}>
          <div className={contentHeaderStyles}>
            <ClockWithArrowIcon fill={getIconFill(theme)} />
            <Overline>Recent chats</Overline>
          </div>
          {sideNavItems}
        </div>
      );
    },
  ),
  {
    displayName: 'ChatSideNavContent',
    key: ChatSideNavSubcomponentProperty.Content,
  },
);
