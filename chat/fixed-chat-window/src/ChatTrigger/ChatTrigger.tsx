import React, { ForwardedRef, forwardRef } from 'react';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  baseStyles,
  buttonTextStyles,
  contentContainerStyles,
  themeStyles,
} from './ChatTrigger.styles';
import { ChatTriggerProps } from './ChatTrigger.types';

export const ChatTrigger = forwardRef(
  (
    { className, children, darkMode: darkModeProp, ...rest }: ChatTriggerProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    return (
      <button
        className={cx(baseStyles, themeStyles[theme], className)}
        {...rest}
        ref={ref}
      >
        <div className={contentContainerStyles}>
          <AssistantAvatar darkMode={darkMode} disabled={rest.disabled} />
          {children && (
            <Body
              baseFontSize={BaseFontSize.Body1}
              className={buttonTextStyles}
            >
              <b>{children}</b>
            </Body>
          )}
        </div>
      </button>
    );
  },
);

ChatTrigger.displayName = 'ChatTrigger';
