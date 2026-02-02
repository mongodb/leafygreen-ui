import React from 'react';
import { MessagePrompts as LGMessagePrompts } from '@lg-chat/message-prompts';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { MessageFeedSubcomponentProperty } from '../../shared.types';

import { type MessagePromptsProps } from './MessagePrompts.types';

export const MessagePrompts = CompoundSubComponent(
  ({ children, ...rest }: MessagePromptsProps) => {
    return (
      <LGMessagePrompts enableHideOnSelect={false} {...rest}>
        {children}
      </LGMessagePrompts>
    );
  },
  {
    displayName: 'MessagePrompts',
    key: MessageFeedSubcomponentProperty.MessagePrompts,
  },
);
