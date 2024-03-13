import React, { ForwardedRef, forwardRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import SparkleIcon from '@leafygreen-ui/icon/dist/Sparkle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
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
    const { theme } = useDarkMode(darkModeProp);
    return (
      <button
        className={cx(baseStyles, themeStyles[theme], className)}
        {...rest}
        ref={ref}
      >
        <div className={contentContainerStyles}>
          <SparkleIcon
            fill={
              theme === Theme.Light ? palette.green.dark1 : palette.green.dark3
            }
          />
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
