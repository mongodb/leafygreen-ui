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
  containerExpandedStyles,
  getContainerInteractedStyles,
  getContainerStatefulStyles,
  getToastHoverStyles,
  getToastTransitionStyles,
  getToastUnhoveredStyles,
  scrollContainerExpandedStyles,
  scrollContainerStyles,
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

/**
 * ToastContainer is responsible for rendering the stack of toasts provided
 */
export const ToastContainer = ({ stack }: { stack: ToastStack }) => {
  const { popToast, getToast } = useToast();
  const regionId = useIdAllocator({ id: 'lg-toast-region' });
  const stackSize = stack.size;
  const doesStackExist = stackSize > 0;
  const toastContainerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const getToastRef = useDynamicRefs<HTMLDivElement>({ prefix: 'toast' });
  const { theme } = useDarkMode();
  const [isHovered, setHoveredState] = useState(false);
  const setHovered = () => setHoveredState(true);
  const setUnhovered = () => setHoveredState(false);
  const [shouldExpand, setShouldExpand, getShouldExpand] = useStateRef(false);
  const expandToasts = () => setShouldExpand(true);
  const collapseToasts = () => setShouldExpand(false);

  const { recentToasts, remainingToasts } = getDividedStack(stack);
  const displayedToasts = shouldExpand
    ? [...remainingToasts, ...recentToasts]
    : recentToasts;

  useEffect(() => {
    if (shouldExpand && stackSize <= TOAST_CONSTANTS.shortStackCount) {
      // We just went below the expanded threshold, so collapse the stack
      setShouldExpand(false);
      // TODO: Check hovered state, and set appropriately
      // JS mediaQuery for (':hover')
    }
  }, [setShouldExpand, shouldExpand, stackSize]);

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
  const { toastHeights, totalStackHeight, updateToastHeights } =
    useToastHeights({
      stack,
      getToastRef,
      shouldExpand,
    });

  // Update on first render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(updateToastHeights, []);

  /**
   * We watch the toast container for mutations,
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
    stackSize > 0,
  );

  /**
   * Keep track of whether the toasts have transitioned in or out
   */
  const { isExpanded, handleTransitionExit, handleTransitionEnter } =
    useToastTransitions({
      containerRef: toastContainerRef,
      getShouldExpand,
      setHoveredState,
      totalStackHeight,
    });

  const isInteracted = isHovered || shouldExpand;

  /**
   * When a user clicks away from the expanded stack, collapse the stack
   */
  useBackdropClick(
    collapseToasts,
    toastContainerRef,
    isExpanded && stackSize > 0,
  );

  /**
   * Callback passed into the InternalToast component as `onClose`
   * Also fired when timeout timers expires
   */
  const handleClose = useCallback(
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

  const getHandlerForId = (id: ToastId) => (e: CloseEvent) =>
    handleClose(id, e);

  /**
   * Set & keep track of timers for each toast in the stack
   */
  useToastTimers({
    stack,
    isHovered,
    callback: handleClose,
  });

  return (
    <Portal className={toastPortalClassName}>
      <div
        ref={toastContainerRef}
        id={regionId}
        data-testid="lg-toast-region"
        role="status"
        aria-live="polite"
        aria-relevant="all"
        data-hovered={isHovered}
        data-should-expand={shouldExpand}
        data-expanded={isExpanded}
        onMouseEnter={setHovered}
        onMouseLeave={setUnhovered}
        onFocus={setHovered}
        onBlur={setUnhovered}
        className={cx(toastContainerStyles, {
          [toastContainerVisibleStyles]: doesStackExist,
          [getContainerStatefulStyles({
            topToastHeight: toastHeights[0],
            recentToastsLength: recentToasts.length,
          })]: doesStackExist,
          [getContainerInteractedStyles({
            totalStackHeight,
            bottomOffset: notificationBarSpacing,
          })]: doesStackExist && isInteracted,
          [containerExpandedStyles]: doesStackExist && shouldExpand,
        })}
      >
        <div
          ref={scrollContainerRef}
          className={cx(scrollContainerStyles, {
            [scrollContainerExpandedStyles(totalStackHeight)]: isExpanded,
          })}
          data-height={totalStackHeight}
        >
          <TransitionGroup enter exit component={null}>
            {displayedToasts
              .reverse() // reversing so they're in the DOM with most recent first
              .map(([id, { onClose, className, ...toastProps }], index) => {
                const toastRef = getToastRef(id);
                onClose = getHandlerForId(id);

                return (
                  <Transition
                    onEntered={handleTransitionEnter}
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
                        data-index={index}
                        isHovered={isInteracted}
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
                              topToastHeight: toastHeights[0],
                            })]: !isInteracted,
                            [getToastHoverStyles({
                              index,
                              toastHeights,
                              theme,
                              bottomOffset: notificationBarSpacing,
                              isExpanded, //: shouldExpand,
                            })]: isInteracted,
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
