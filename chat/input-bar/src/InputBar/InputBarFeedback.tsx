import React, { forwardRef } from 'react';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import Banner from '@leafygreen-ui/banner';
import Button from '@leafygreen-ui/button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, Error } from '@leafygreen-ui/typography';

import {
  bannerContentContainerStyles,
  bannerStyles,
  getLoadingTextStyles,
  loadingContainerStyles,
  statusContainerStyles,
} from './InputBarFeedback.styles';
import { InputBarFeedbackProps } from './InputBarFeedback.types';
import { State } from './shared.types';

const texts = {
  defaultError: 'Oops... Something went wrong.',
  loading: 'MongoDB Assistant is thinking',
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
    const { darkMode, theme } = useDarkMode(darkModeProp);

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
            <AssistantAvatar darkMode={darkMode} size={20} />
            <Body className={getLoadingTextStyles(theme)}>{texts.loading}</Body>
          </div>
        )}

        {state === State.Error && (
          <Banner variant="danger" className={bannerStyles}>
            <div className={bannerContentContainerStyles}>
              <Error>{errorMessage || texts.defaultError}</Error>
              <Button size="xsmall" type="submit">
                {texts.retryButton}
              </Button>
            </div>
          </Banner>
        )}
      </div>
    );
  },
);

InputBarFeedback.displayName = 'InputBarFeedback';
