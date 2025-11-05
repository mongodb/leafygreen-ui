import React, { Children, forwardRef } from 'react';

import { isComponentType } from '@leafygreen-ui/lib';

import { chatWindowWrapperStyles, getContainerStyles } from './ChatMain.styles';
import { ChatMainProps } from './ChatMain.types';

/**
 * ChatMain represents the main content area of the chat layout.
 * It automatically positions itself in the second column of the parent
 * ChatLayout's CSS Grid, allowing the layout to control spacing for the sidebar.
 */
export const ChatMain = forwardRef<HTMLDivElement, ChatMainProps>(
  ({ children, className, ...rest }, ref) => {
    const renderedChildren = Children.toArray(children).map(child => {
      if (isComponentType(child, 'ChatWindow')) {
        return (
          <div className={chatWindowWrapperStyles} key="chat-window-wrapper">
            {child}
          </div>
        );
      } else {
        return child;
      }
    });

    return (
      <div ref={ref} className={getContainerStyles({ className })} {...rest}>
        {renderedChildren}
      </div>
    );
  },
);

ChatMain.displayName = 'ChatMain';
