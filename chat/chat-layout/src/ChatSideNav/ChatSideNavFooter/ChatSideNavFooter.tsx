import React, { forwardRef } from 'react';

import NavCollapseIcon from '@leafygreen-ui/icon/dist/NavCollapse';
import NavExpandIcon from '@leafygreen-ui/icon/dist/NavExpand';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChatLayoutContext } from '../../ChatLayout/ChatLayoutContext';
import { type ChatSideNavFooterProps } from '../ChatSideNav.types';

import { getFooterStyles } from './ChatSideNavFooter.styles';

/** @internal */
export const ChatSideNavFooter = forwardRef<
  HTMLDivElement,
  ChatSideNavFooterProps
>(({ className, ...rest }, ref) => {
  const { isPinned } = useChatLayoutContext();
  const { theme } = useDarkMode();
  return (
    <div ref={ref} className={getFooterStyles({ className, theme })} {...rest}>
      <IconButton aria-label={`${isPinned ? 'Unpin' : 'Pin'} side nav`}>
        {isPinned ? <NavCollapseIcon /> : <NavExpandIcon />}
      </IconButton>
    </div>
  );
});

ChatSideNavFooter.displayName = 'ChatSideNavFooter';
