import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import flattenChildren from 'react-keyed-flatten-children';
import { useLeafyGreenChatContext } from '@lg-chat/leafygreen-chat-provider';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';

import { ScrollToLatestButton } from '../ScrollToLatestButton';

import {
  disclaimerTextStyles,
  getAvatarPaddingStyles,
  getContainerStyles,
  getMessageFeedStyles,
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
    const isDesktop =
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
            className={getAvatarPaddingStyles(isDesktop)}
          >
            {child}
          </div>
        );
      } else {
        return child;
      }
    });

    const [showScrollButton, setShowScrollButton] = useState(false);
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const scrollToLatest = useCallback(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo(0, containerRef.current.scrollHeight);
      }
    }, []);

    useEffect(() => {
      const scrollElement = containerRef.current;
      if (!scrollElement) return;

      const isScrolledToEnd = () => {
        if (!containerRef.current) return true;
        const { scrollHeight, scrollTop, clientHeight } = containerRef.current;
        // Add a small buffer (2px) to account for floating point differences
        return scrollHeight - scrollTop - clientHeight <= 2;
      };

      // Handle scroll events
      const handleScroll = () => {
        // Clear any existing timeout
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }

        // Wait until scroll animation completes This avoids a brief flicker
        // when the user scrolls to the bottom
        const scrollDuration = 100;
        scrollTimerRef.current = setTimeout(() => {
          setShowScrollButton(!isScrolledToEnd());
        }, scrollDuration);
      };

      scrollElement.addEventListener('scroll', handleScroll);

      return () => {
        scrollElement.removeEventListener('scroll', handleScroll);
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }
      };
    }, []);

    useEffect(() => {
      if (!showScrollButton) {
        scrollToLatest();
      }
    }, [children, showScrollButton, scrollToLatest]);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          {...rest}
          className={getContainerStyles({ className, theme })}
          ref={ref}
        >
          <div className={getMessageFeedStyles(theme)} ref={containerRef}>
            {renderedChildren}
          </div>
          <ScrollToLatestButton
            darkMode={darkMode}
            onClick={scrollToLatest}
            visible={showScrollButton}
          />
        </div>
      </LeafyGreenProvider>
    );
  },
);

MessageFeed.displayName = 'MessageFeed';
