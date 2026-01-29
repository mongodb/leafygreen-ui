import React from 'react';
import { MessagePrompt as LGMessagePrompt } from '@lg-chat/message-prompts';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { MessageFeedSubcomponentProperty } from '../../shared.types';

import { type MessagePromptProps } from './MessagePrompt.types';

export const MessagePrompt = CompoundSubComponent(
  ({ children, ...rest }: MessagePromptProps) => {
    return <LGMessagePrompt {...rest}>{children}</LGMessagePrompt>;
  },
  {
    displayName: 'MessagePrompt',
    key: MessageFeedSubcomponentProperty.MessagePrompts,
  },
);
