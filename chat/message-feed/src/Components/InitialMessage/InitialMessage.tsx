import React, { forwardRef } from 'react';
import { Message } from '@lg-chat/message';

import { AssistantAvatar, AvatarSize } from '@leafygreen-ui/avatar';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
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
    ({ children, ...rest }, fwdRef) => {
      const { shouldHideInitialMessage } = useMessageFeedContext();

      return (
        <Message isSender={false} ref={fwdRef} {...rest}>
          <div
            className={getWrapperStyles({
              shouldHide: shouldHideInitialMessage,
            })}
          >
            <div className={innerWrapperStyles}>
              <div>
                <AssistantAvatar size={AvatarSize.Large} />
                <Body weight="semiBold" className={titleStyles}>
                  {INITIAL_MESSAGE_TITLE}
                </Body>
                <Body>{INITIAL_MESSAGE_DESCRIPTION}</Body>
              </div>
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
