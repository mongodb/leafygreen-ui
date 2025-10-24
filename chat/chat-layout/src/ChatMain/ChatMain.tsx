import React, { forwardRef } from 'react';

import { getContainerStyles } from './ChatMain.styles';
import { ChatMainProps } from './ChatMain.types';

/**
 * ChatMain represents the main content area of the chat layout.
 * It automatically positions itself in the second column of the parent
 * ChatLayout's CSS Grid, allowing the layout to control spacing for the sidebar.
 */
export const ChatMain = forwardRef<HTMLDivElement, ChatMainProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div ref={ref} className={getContainerStyles({ className })} {...rest}>
        {children}
      </div>
    );
  },
);

ChatMain.displayName = 'ChatMain';
