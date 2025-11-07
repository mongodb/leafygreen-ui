import React, { forwardRef } from 'react';

import { Button } from '@leafygreen-ui/button';
import NavCollapseIcon from '@leafygreen-ui/icon/dist/NavCollapse';
import NavExpandIcon from '@leafygreen-ui/icon/dist/NavExpand';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useChatLayoutContext } from '../../ChatLayout/ChatLayoutContext';
import { type ChatSideNavFooterProps } from '../ChatSideNav.types';

import { getButtonStyles, getFooterStyles } from './ChatSideNavFooter.styles';

/** @internal */
export const ChatSideNavFooter = forwardRef<
  HTMLDivElement,
  ChatSideNavFooterProps
>(({ className, ...rest }, ref) => {
  const { theme } = useDarkMode();
  const { isPinned, togglePin, shouldRenderExpanded } = useChatLayoutContext();

  return (
    <div
      ref={ref}
      className={getFooterStyles({ className, shouldRenderExpanded, theme })}
      {...rest}
    >
      <Button
        aria-label={`${isPinned ? 'Unpin' : 'Pin'} side nav`}
        className={getButtonStyles(theme)}
        onClick={togglePin}
      >
        {isPinned ? <NavCollapseIcon /> : <NavExpandIcon />}
      </Button>
    </div>
  );
});

ChatSideNavFooter.displayName = 'ChatSideNavFooter';
