import React, { forwardRef } from 'react';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { Banner } from '@leafygreen-ui/banner';
import { Button } from '@leafygreen-ui/button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, Error } from '@leafygreen-ui/typography';

import { State } from '../shared.types';

import {
  bannerContentContainerStyles,
  bannerStyles,
  getLoadingTextStyles,
  loadingContainerStyles,
  statusContainerStyles,
} from './InputBarFeedback.styles';
import { InputBarFeedbackProps } from './InputBarFeedback.types';

const messages = {
  defaultError: 'Oops... Something went wrong.',
  retryButton: 'Retry',
} as const;

export const InputBarFeedback = forwardRef<
  HTMLDivElement,
  InputBarFeedbackProps
>(
  (
    {
      children,
      className,
      darkMode: darkModeProp,
      errorMessage,
      state,
      ...rest
    },
    fwdRef,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const { assistantName } = useLeafyGreenChatContext();

    return (
      <div
        aria-live="polite"
        aria-relevant="all"
        className={statusContainerStyles}
        ref={fwdRef}
        {...rest}
      >
        {state === State.Loading && (
          <div className={loadingContainerStyles}>
            <AssistantAvatar size={20} />
            <Body className={getLoadingTextStyles(theme)}>
              {`${assistantName} is thinking`}
            </Body>
          </div>
        )}

        {state === State.Error && (
          <Banner variant="danger" className={bannerStyles}>
            <div className={bannerContentContainerStyles}>
              <Error>{errorMessage || messages.defaultError}</Error>
              <Button size="xsmall" type="submit">
                {messages.retryButton}
              </Button>
            </div>
          </Banner>
        )}
      </div>
    );
  },
);

InputBarFeedback.displayName = 'InputBarFeedback';
