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

import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { isComponentType } from '@leafygreen-ui/lib';
import { breakpoints } from '@leafygreen-ui/tokens';
import Icon from '@leafygreen-ui/icon';
import Button, { Size as ButtonSize } from '@leafygreen-ui/button';
import IconButton from '@leafygreen-ui/icon-button';

import {
  avatarPaddingStyles,
  baseStyles,
  desktopAvatarPaddingStyles,
  disclaimerTextStyles,
  messageFeedStyles,
  messageFeedThemeStyles,
  scrollButtonStyles,
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

    const [showScrollButton, setShowScrollButton] = useState(false);
    const scrollTimerRef = useRef(null);

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
        const { scrollHeight, scrollTop, clientHeight, offsetHeight } =
          containerRef.current;
        // Add a small buffer (2px) to account for floating point differences
        return scrollHeight - scrollTop - clientHeight <= 2;
      };

      // Handle scroll events
      const handleScroll = () => {
        // Clear any existing timeout
        if (scrollTimerRef.current) {
          clearTimeout(scrollTimerRef.current);
        }

        // Wait until scroll animation completes
        scrollTimerRef.current = setTimeout(() => {
          setShowScrollButton(!isScrolledToEnd());
        }, 100);
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
    }, [children, showScrollButton]);

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
            <ScrollToLatestButton
              visible={showScrollButton}
              handleScroll={scrollToLatest}
              darkMode={darkMode}
            />
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

MessageFeed.displayName = 'MessageFeed';

function ScrollToLatestButton({
  visible,
  handleScroll,
  darkMode: darkModeProp,
}: {
  visible: boolean;
  handleScroll: () => void;
  darkMode?: boolean;
}) {
  const { darkMode } = useDarkMode(darkModeProp);
  return visible ? (
    <div className={scrollButtonStyles}>
      <Button
        onClick={handleScroll}
        darkMode={darkMode}
        aria-label="Scroll to latest message"
        size={ButtonSize.Small}
      >
        Scroll to latest
        <Icon glyph="ArrowDown" />
      </Button>
    </div>
  ) : null;
}
