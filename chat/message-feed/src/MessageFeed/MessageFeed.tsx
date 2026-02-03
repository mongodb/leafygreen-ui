import React, {
  ForwardedRef,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useInView } from 'react-intersection-observer';

import {
  CompoundComponent,
  filterChildren,
  findChild,
} from '@leafygreen-ui/compound-component';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { InitialMessage } from '../components/InitialMessage';
import { MessageFeedProvider } from '../MessageFeedContext';
import { ScrollToLatestButton } from '../ScrollToLatestButton';
import { MessageFeedSubcomponentProperty } from '../shared.types';

import {
  getWrapperStyles,
  interceptStyles,
  scrollContainerStyles,
} from './MessageFeed.styles';
import { MessageFeedProps } from '.';

export const MessageFeed = CompoundComponent(
  // eslint-disable-next-line react/display-name
  forwardRef(
    (
      {
        children,
        darkMode: darkModeProp,
        className,
        ...rest
      }: MessageFeedProps,
      ref: ForwardedRef<HTMLDivElement>,
    ) => {
      const { darkMode, theme } = useDarkMode(darkModeProp);

      const scrollContainerRef = useRef<HTMLDivElement | null>(null);
      const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

      const [showScrollButton, setShowScrollButton] = useState(false);

      const { ref: topInterceptRef, inView: isTopInView } = useInView({
        initialInView: true,
        root: scrollContainerRef.current,
        threshold: 0,
      });
      const { ref: bottomInterceptRef, inView: isBottomInView } = useInView({
        initialInView: true,
        root: scrollContainerRef.current,
        threshold: 0,
      });

      const scrollToLatest = useCallback(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo(
            0,
            scrollContainerRef.current.scrollHeight,
          );
        }
      }, []);

      useEffect(() => {
        const scrollElement = scrollContainerRef.current;
        if (!scrollElement) return;

        const isScrolledToEnd = () => {
          if (!scrollContainerRef.current) return true;
          const { scrollHeight, scrollTop, clientHeight } =
            scrollContainerRef.current;
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

      // Find the InitialMessage component
      const initialMessage = findChild(
        children,
        MessageFeedSubcomponentProperty.InitialMessage,
      );

      // Filter out subcomponents from children
      const remainingChildren = useMemo(
        () =>
          filterChildren(
            children,
            Object.values(MessageFeedSubcomponentProperty),
          ),
        [children],
      );

      // Checks if there are any remaining children
      const hasRemainingChildren = React.Children.count(remainingChildren) > 0;

      return (
        <LeafyGreenProvider darkMode={darkMode}>
          <MessageFeedProvider shouldHideInitialMessage={hasRemainingChildren}>
            <div
              {...rest}
              className={getWrapperStyles({
                className,
                hasBottomShadow: !isBottomInView,
                hasTopShadow: !isTopInView,
                theme,
              })}
              ref={ref}
            >
              <div className={scrollContainerStyles} ref={scrollContainerRef}>
                {/* Empty span element used to track if container can scroll up */}
                <span className={interceptStyles} ref={topInterceptRef} />
                {initialMessage}
                {remainingChildren}
                {/* Empty span element used to track if container can scroll down */}
                <span className={interceptStyles} ref={bottomInterceptRef} />
              </div>
              <ScrollToLatestButton
                darkMode={darkMode}
                onClick={scrollToLatest}
                visible={showScrollButton}
              />
            </div>
          </MessageFeedProvider>
        </LeafyGreenProvider>
      );
    },
  ),
  {
    displayName: 'MessageFeed',
    InitialMessage,
  },
);
