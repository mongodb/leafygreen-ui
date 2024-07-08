import React, { ForwardedRef, forwardRef, useEffect, useRef } from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';

import {
  avatarPaddingStyles,
  baseStyles,
  desktopAvatarPaddingStyles,
  disclaimerTextStyles,
  messageFeedStyles,
  messageFeedThemeStyles,
  themeStyles,
} from './MessageFeed.styles';
import { MessageFeedProps } from '.';

export const MessageFeed = forwardRef(
  (
    { children, darkMode: darkModeProp, className, ...rest }: MessageFeedProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) => {
    const { containerWidth: chatContainerWidth } = useLeafyGreenChatContext();
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDesktop = () =>
      !!chatContainerWidth && chatContainerWidth >= breakpoints.Tablet;

    const flattenedChildren = flattenChildren(children);
    const renderedChildren = flattenedChildren.map(child => {
      if (isComponentType(child, 'DisclaimerText')) {
        return (
          <div className={disclaimerTextStyles} key="disclaimer-text">
            {child}
          </div>
        );
      } else if (isComponentType(child, 'MessagePrompts')) {
        return (
          <div
            key="message-prompts"
            className={cx(avatarPaddingStyles, {
              [desktopAvatarPaddingStyles]: isDesktop(),
            })}
          >
            {child}
          </div>
        );
      } else {
        return child;
      }
    });

    useEffect(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
      }
    }, [children]);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          {...rest}
          className={cx(baseStyles, themeStyles[theme], className)}
          ref={ref}
        >
          <div
            className={cx(messageFeedThemeStyles[theme], messageFeedStyles)}
            ref={containerRef}
          >
            {renderedChildren}
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

MessageFeed.displayName = 'MessageFeed';

MessageFeed.propTypes = {
  darkMode: PropTypes.bool,
};
