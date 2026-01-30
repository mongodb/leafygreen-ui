import React, { forwardRef } from 'react';
import { Message } from '@lg-chat/message';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { CompoundSubComponent } from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
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
    ({ children, darkMode: darkModeProp, ...rest }, fwdRef) => {
      const { shouldHideInitialMessage } = useMessageFeedContext();
      const { darkMode } = useDarkMode(darkModeProp);

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <Message
            sourceType="markdown"
            isSender={false}
            ref={fwdRef}
            {...rest}
          >
            <div
              className={getWrapperStyles({
                shouldHide: shouldHideInitialMessage,
              })}
            >
              <div className={innerWrapperStyles}>
                <div>
                  <AssistantAvatar size={20} />
                  <Body weight="semiBold" className={titleStyles}>
                    {INITIAL_MESSAGE_TITLE}
                  </Body>
                  <Body>{INITIAL_MESSAGE_DESCRIPTION}</Body>
                </div>
                {children}
              </div>
            </div>
          </Message>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'InitialMessage',
    key: MessageFeedSubcomponentProperty.InitialMessage,
  },
);
