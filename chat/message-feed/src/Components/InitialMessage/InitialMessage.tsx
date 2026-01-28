import React, { forwardRef } from 'react';
import { Message } from '@lg-chat/message';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { Body } from '@leafygreen-ui/typography';

import { useMessageFeedContext } from '../../MessageFeedContext';
import { MessageFeedSubcomponentProperty } from '../../shared.types';

import { getWrapperStyles, titleStyles } from './InitialMessage.styles';
import { type InitialMessageProps } from './InitialMessage.types';

const TITLE = 'Hello! How can I help you?';
const DESCRIPTION =
  "I'm here to give expert guidance and recommendations for all things MongoDB.";

/**
 * Renders promotional content with an award icon and "Learn More" link.
 *
 * @returns The rendered promotional message component.
 */
export const InitialMessage = CompoundSubComponent(
  // eslint-disable-next-line react/display-name
  forwardRef<HTMLDivElement, InitialMessageProps>(
    ({ className, children, ...rest }, fwdRef) => {
      const { shouldHideInitialMessage } = useMessageFeedContext();
      const initialMessageId = useIdAllocator({ prefix: 'initial-message' });

      return (
        <Message
          key={initialMessageId}
          sourceType="markdown"
          isSender={false}
          ref={fwdRef}
          {...rest}
        >
          <div className="">
            <AssistantAvatar size={20} />
            <Body weight="semiBold" className={titleStyles}>
              {TITLE}
            </Body>
            <Body>{DESCRIPTION}</Body>
          </div>
          <div
            className={getWrapperStyles({
              shouldHide: shouldHideInitialMessage,
              className,
            })}
            {...rest}
          >
            {children}
          </div>
        </Message>
      );
    },
  ),
  {
    displayName: 'InitialMessage',
    key: MessageFeedSubcomponentProperty.InitialMessage,
  },
);
