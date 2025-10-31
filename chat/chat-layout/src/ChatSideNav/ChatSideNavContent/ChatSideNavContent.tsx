import React, { forwardRef } from 'react';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import {
  ChatSideNavContentProps,
  ChatSideNavSubcomponentProperty,
} from '../ChatSideNav.types';

import { getContentStyles } from './ChatSideNavContent.styles';

export const ChatSideNavContent = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, ChatSideNavContentProps>(
    ({ children, className, ...rest }, ref) => {
      return (
        <div ref={ref} className={getContentStyles({ className })} {...rest}>
          {children}
        </div>
      );
    },
  ),
  {
    displayName: 'ChatSideNavContent',
    key: ChatSideNavSubcomponentProperty.Content,
  },
);
