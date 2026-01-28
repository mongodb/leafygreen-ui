import React, { forwardRef } from 'react';
import { Message } from '@lg-chat/message';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { Body } from '@leafygreen-ui/typography';

import { useMessageFeedContext } from '../../MessageFeedContext';
import { MessageFeedSubcomponentProperty } from '../../shared.types';

import {
  INITIAL_MESSAGE_DESCRIPTION,
  INITIAL_MESSAGE_TITLE,
} from './constants';
import {
  getWrapperStyles,
  innerWrapperStyles,
  titleStyles,
} from './InitialMessage.styles';
import { type InitialMessageProps } from './InitialMessage.types';
/**
 * Renders an initial message in the message feed.
 *
 * @returns The rendered initial message component.
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
          <div
            data-testid="initial-message-wrapper"
            className={getWrapperStyles({
              shouldHide: shouldHideInitialMessage,
              className,
            })}
            {...rest}
          >
            <div className={innerWrapperStyles}>
              <AssistantAvatar size={20} />
              <Body weight="semiBold" className={titleStyles}>
                {INITIAL_MESSAGE_TITLE}
              </Body>
              <Body>{INITIAL_MESSAGE_DESCRIPTION}</Body>

              {children}
            </div>
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
