import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';
import {
  useBackdropClick,
  useDynamicRefs,
  useIdAllocator,
  useMutationObserver,
  useStateRef,
} from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  createSyntheticEvent,
  createUniqueClassName,
  keyMap,
} from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { TOAST_CONSTANTS } from '../constants';
import { InternalToast } from '../InternalToast';
import { ToastId, ToastStack, useToast } from '../ToastContext';

import {
  NotificationBar,
  notificationBarTransitionStyles,
} from './NotificationBar';
import {
  containerCollapsingStyles,
  containerExpandedStyles,
  getContainerInteractedStyles,
  getContainerStatefulStyles,
  getToastHoverStyles,
  getToastTransitionStyles,
  getToastUnhoveredStyles,
  portalStyles,
  scrollContainerExpandedStyles,
  scrollContainerStyles,
  scrollContainerTransitionOutStyles,
  toastContainerStyles,
  toastContainerVisibleStyles,
} from './ToastContainer.styles';
import {
  getDividedStack,
  useToastHeights,
  useToastTimers,
  useToastTransitions,
} from './utils';

export const toastPortalClassName = createUniqueClassName('toast-portal');

interface ToastContainerProps {
  stack: ToastStack;
  portalClassName?: string;
}

/**
 * ToastContainer is responsible for rendering the stack of toasts provided.
 * Rendered by the `ToastProvider`
 *
 * @internal
 */
export const ToastContainer = ({
  stack,
  portalClassName,
}: ToastContainerProps) => {
  const { popToast, getToast } = useToast();
  const regionId = useIdAllocator({ id: 'lg-toast-region' });
  const toastContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const getToastRef = useDynamicRefs<HTMLDivElement>({ prefix: 'toast' });
  const { theme } = useDarkMode();
  // Track hover state
  const [isHovered, setHoveredState] = useState(false);
  const setHovered = () => setHoveredState(true);
  const setUnhovered = () => setHoveredState(false);
  // Track intended expand state
  const [shouldExpand, setShouldExpand, getShouldExpand] = useStateRef(false);
  const expandToasts = () => setShouldExpand(true);
  const collapseToasts = () => setShouldExpand(false);
  // Track stack size
  const doesStackExist = stack.size > 0;

  const { recentToasts, remainingToasts } = getDividedStack(stack);
  const displayedToasts = shouldExpand
    ? [...remainingToasts, ...recentToasts]
    : recentToasts;

  /** is the "N more" bar visible? */
  const showNotificationBar =
    isHovered && !shouldExpand && remainingToasts.length > 0;
  /** How much vertical space is the "N more" bar taking up  */
  const notificationBarSpacing = showNotificationBar
    ? TOAST_CONSTANTS.notificationBarHeight + TOAST_CONSTANTS.gap
    : 0;

  /**
   * Keep track of the DOM height of each toast element
   */
  const {
    toastHeights,
    totalStackHeight,
    calcHeightForIndex,
    updateToastHeights,
  } = useToastHeights({
    stack,
    getToastRef,
    shouldExpand,
  });

  // Force update on first render _only_
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateToastHeights, []);

  // The id of the top-most toast
  const topToastId = Array.from(stack).reverse()[0]?.[0]; // reverse since stack is bottom-up

  /**
   * We watch the toast container for child mutations,
   * and calculate the toast height variables once they are added to the DOM
   */
  useMutationObserver(
    toastContainerRef.current,
    {
      childList: true,
      attributes: true,
      subtree: true,
    },
    updateToastHeights,
    stack.size > 0,
  );

  /**
   * Keep track of whether the toasts have transitioned in or out,
   * and generate event handlers.
   *
   * Note: The enter/exit callbacks are debounced, and called with setInterval,
   * (since we need DOM manipulations to be complete)
   *
   */
  const {
    isExpanded,
    setIsExpanded,
    handleTransitionExit,
    handleTransitionEnter,
  } = useToastTransitions({
    getShouldExpand,
    enterCallback: () => {
      if (toastContainerRef.current) {
        toastContainerRef.current.scrollTop = totalStackHeight;
      }

      // Recalculate heights if we should be in the expanded state
      if (getShouldExpand()) {
        updateToastHeights();
      }
    },
    exitCallback: () => {
      if (scrollContainerRef.current) {
        // check whether the toast container is still hovered
        const _isHovered = scrollContainerRef.current.matches(':hover');
        setHoveredState(_isHovered);
      }

      // Recalculate heights if we should be in the expanded state
      if (getShouldExpand()) {
        updateToastHeights();
      }
    },
  });

  /**
   * Handler triggered when a toast starts to transition in
   */
  const handleTransitionEntering = () => {
    if (isHovered || getShouldExpand()) {
      updateToastHeights();
    }
  };

  /**
   * Handler triggered when a toast starts to transition out
   */
  const handleTransitionExiting = () => {
    if (isHovered || getShouldExpand()) {
      updateToastHeights();
    }
  };

  /**
   * When a user clicks away from the expanded stack,
   * collapse the stack
   * and set the expanded state
   */
  const handleBackdropClick = () => {
    collapseToasts();
    setIsExpanded(getShouldExpand());
  };

  useBackdropClick(
    handleBackdropClick,
    scrollContainerRef,
    isExpanded && stack.size > 0,
  );

  /**
   * Callback passed into the InternalToast component as `onClose`
   * Also fired when timeout timers expires
   */
  const handleCloseEventForToastId = useCallback(
    (id: ToastId, e?: CloseEvent) => {
      const toast = getToast(id);
      const toastRef = getToastRef(id);

      if (toast && toastRef?.current) {
        // We only self-close the toast if it's not externally controlled
        if (!toast.isControlled) {
          popToast(id);
        }

        toast.onClose?.(
          // Call the close handler either with the default click event (if it exists),
          // or a synthetic custom "timeout" event
          e ?? createSyntheticEvent(new Event('timeout'), toastRef.current),
        );
      }
    },
    [getToast, getToastRef, popToast],
  );

  /** Returns the close event handler with toastID in the closure */
  const getHandlerForId = (id: ToastId) => (e: CloseEvent) =>
    handleCloseEventForToastId(id, e);

  /**
   * Set & keep track of timers for each toast in the stack
   */
  useToastTimers({
    stack,
    isHovered,
    callback: handleCloseEventForToastId,
  });

  /** When expanded, collapse the stack when the escape key is pressed */
  const handleContainerKeydown: React.KeyboardEventHandler = e => {
    if (isExpanded && e.keyCode === keyMap.Escape) {
      collapseToasts();
    }
  };

  return (
    <Portal className={cx(portalStyles, toastPortalClassName, portalClassName)}>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <div
        ref={toastContainerRef}
        id={regionId}
        data-testid="lg-toast-region"
        role="status"
        aria-live="polite"
        aria-relevant="all"
        onFocus={setHovered}
        onBlur={setUnhovered}
        onKeyDown={handleContainerKeydown}
        className={cx(toastContainerStyles, {
          [toastContainerVisibleStyles]: doesStackExist,
          [getContainerStatefulStyles({
            topToastHeight: toastHeights[topToastId],
            recentToastsLength: recentToasts.length,
          })]: doesStackExist,
          [getContainerInteractedStyles({
            totalStackHeight,
            bottomOffset: notificationBarSpacing,
          })]: doesStackExist && (isHovered || shouldExpand),
          // Wait to apply fully expanded styles until the toast transition is complete
          [containerExpandedStyles]: doesStackExist && isExpanded,
          [containerCollapsingStyles]: isExpanded && !shouldExpand,
        })}
      >
        <div
          ref={scrollContainerRef}
          data-testid="lg-toast-scroll-container"
          onMouseEnter={setHovered}
          onMouseLeave={setUnhovered}
          className={cx(scrollContainerStyles, {
            // Wait to apply fully expanded styles until the toast transition is complete
            [scrollContainerExpandedStyles(totalStackHeight)]: isExpanded,
            [scrollContainerTransitionOutStyles]: isExpanded && !shouldExpand,
          })}
        >
          <TransitionGroup enter exit component={null}>
            {displayedToasts
              .reverse() // reversing so they're in the DOM with most recent first
              .map(([id, { onClose, className, ...toastProps }], index) => {
                const toastRef = getToastRef(id);
                onClose = getHandlerForId(id); // getHandler will call toast.onClose if it exists

                return (
                  <Transition
                    onEntering={handleTransitionEntering}
                    onEntered={handleTransitionEnter}
                    onExiting={handleTransitionExiting}
                    onExited={handleTransitionExit}
                    key={id}
                    timeout={transitionDuration.default}
                  >
                    {state => (
                      <InternalToast
                        {...toastProps}
                        id={id}
                        ref={toastRef}
                        onClose={onClose}
                        index={index}
                        isHovered={isHovered || shouldExpand}
                        className={cx(
                          getToastTransitionStyles({
                            state,
                            theme,
                            index,
                          }),
                          {
                            [getToastUnhoveredStyles({
                              theme,
                              index,
                              topToastHeight: toastHeights[topToastId],
                            })]: !(isHovered || shouldExpand),

                            [getToastHoverStyles({
                              positionY:
                                calcHeightForIndex(index, isExpanded) +
                                notificationBarSpacing,
                              height: toastHeights[id],
                              theme,
                            })]: isHovered || shouldExpand,
                          },
                          className,
                        )}
                        description={toastProps.description}
                      />
                    )}
                  </Transition>
                );
              })}
          </TransitionGroup>

          <Transition
            in={showNotificationBar && !shouldExpand}
            timeout={transitionDuration.slower}
          >
            {state => (
              <NotificationBar
                count={remainingToasts.length}
                onClick={expandToasts}
                className={notificationBarTransitionStyles[state]}
              />
            )}
          </Transition>
        </div>
      </div>
    </Portal>
  );
};
