import React from 'react';
import { MessagePrompt as LGMessagePrompt } from '@lg-chat/message-prompts';

import { CompoundSubComponent } from '@leafygreen-ui/compound-component';

import { InitialMessageSubcomponentProperty } from '../InitialMessage/InitialMessage.types';

import { type MessagePromptsItemProps } from './MessagePromptsItem.types';

export const MessagePromptsItem = CompoundSubComponent(
  ({ children, ...rest }: MessagePromptsItemProps) => {
    return <LGMessagePrompt {...rest}>{children}</LGMessagePrompt>;
  },
  {
    displayName: 'MessagePromptsItem',
    key: InitialMessageSubcomponentProperty.MessagePromptsItem,
  },
);
