import React, { forwardRef } from 'react';

import {
  CompoundSubComponent,
  findChildren,
} from '@leafygreen-ui/compound-component';
import ClockWithArrowIcon from '@leafygreen-ui/icon/dist/ClockWithArrow';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Overline } from '@leafygreen-ui/typography';

import { useChatLayoutContext } from '../../ChatLayout/ChatLayoutContext';
import {
  ChatSideNavContentProps,
  ChatSideNavSubcomponentProperty,
} from '../ChatSideNav.types';

import {
  getContentHeaderStyles,
  getContentStyles,
  getIconFill,
  getOverlineStyles,
} from './ChatSideNavContent.styles';

export const ChatSideNavContent = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ChatSideNavContentProps>(
    ({ children, className, ...rest }, ref) => {
      const { theme } = useDarkMode();
      const { isPinned, isSideNavHovered } = useChatLayoutContext();

      const shouldRenderExpanded = isPinned || isSideNavHovered;

      const sideNavItems = findChildren(
        children,
        ChatSideNavSubcomponentProperty.SideNavItem,
      );

      return (
        <div
          ref={ref}
          className={getContentStyles({
            className,
            shouldRenderExpanded,
            theme,
          })}
          {...rest}
        >
          <div
            className={getContentHeaderStyles({ shouldRenderExpanded, theme })}
          >
            <ClockWithArrowIcon fill={getIconFill(theme)} />
            <Overline
              className={getOverlineStyles({
                shouldRender: shouldRenderExpanded,
                theme,
              })}
            >
              Recent chats
            </Overline>
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
