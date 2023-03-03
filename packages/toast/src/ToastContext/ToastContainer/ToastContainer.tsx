import React, { SyntheticEvent, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { css, cx } from '@leafygreen-ui/emotion';
import {
  useDynamicRefs,
  useIdAllocator,
  useMutationObserver,
} from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import {
  gap,
  notificationBarHeight,
  shortStackCount,
  toastHeight,
  toastInset,
  yOffset,
} from '../../constants';
import { InternalToast, toastBGColor } from '../../InternalToast';
import { ToastId, ToastStack } from '../ToastContext.types';
import { useToast } from '..';

import { NotificationBar } from './NotificationBar/NotificationBar';
import { notificationBarTransitionStyles } from './NotificationBar/NotificationBar.styles';
import { getDividedStack } from './utils/getDividedStack';
import {
  // getContainerHoverStyles,
  // getToastHoverStyles,
  getToastTransitionStyles,
  toastContainerStyles,
} from './ToastContainer.styles';
import { useTimers } from './useTimers';

export const toastPortalClassName = createUniqueClassName('toast-portal');
const toastClassName = createUniqueClassName('toast');

/**
 * ToastContainer is responsible for rendering the stack of toasts provided
 */
export const ToastContainer = ({ stack }: { stack: ToastStack }) => {
  const regionId = useIdAllocator({ id: 'lg-toast-region' });
  const toastContainerRef = useRef<HTMLDivElement>(null);
  const getToastRef = useDynamicRefs<HTMLDivElement>({ prefix: 'toast' });
  const { theme } = useDarkMode();
  const { popToast } = useToast();
  const [isHovered, setHovered] = useState(false);

  const { recentToasts, remainingToasts } = getDividedStack(stack);

  const showNotifBar = isHovered && remainingToasts.length > 0;
  const notifBarSpacing = showNotifBar ? notificationBarHeight + gap : 0;

  function handleClose(id: ToastId, e?: SyntheticEvent) {
    const toast = stack.get(id);

    if (toast) {
      // We only self-close the toast if it's not externally controlled
      if (!toast.isControlled) {
        popToast(id);
      }
      toast.onClose?.(e);
    }
  }

  useTimers({
    stack,
    isHovered,
    callback: handleClose,
  });

  /**
   * Keep track of all the toasts' heights
   * so we know how to absolutely position the rest of them
   */
  function calcToastHeights() {
    return Array.from(stack)
      .reverse() // reversing since the stack is oldest-first
      .map(([id]) => {
        const ref = getToastRef(id);

        // Height of the content + padding
        if (ref?.current) {
          return ref.current.firstElementChild
            ? ref.current.firstElementChild?.clientHeight + spacing[2] * 2
            : 0;
        }

        return 0;
      })
      .filter(h => h >= 0);
  }

  const [toastHeights, setToastHeights] = useState<Array<number>>([]);

  useMutationObserver(
    toastContainerRef.current,
    {
      childList: true,
      attributes: true,
      subtree: true,
    },
    () => {
      // When elements are added/removed,
      // Calculate all toast heights
      setToastHeights(calcToastHeights());
    },
  );

  function handleTransitionExit() {
    // When a toast is removed,
    // wait for an empty queue, then
    // Check whether the toast container is still hovered
    setImmediate(() => {
      if (toastContainerRef.current) {
        const _isHovered = toastContainerRef.current.matches(':hover');
        setHovered(_isHovered);
      }
    });
  }

  return (
    <Portal className={toastPortalClassName}>
      <div
        ref={toastContainerRef}
        id={regionId}
        data-testid="lg-toast-region"
        role="status"
        aria-live="polite"
        aria-relevant="all"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className={cx(
          toastContainerStyles,
          css`
            // The height of the first toast + inset
            height: ${toastInset * 2 + toastHeights[0] ?? toastHeight}px;

            // The whole thing moves as toasts get added
            // so the bottom toast is always 16px from the bottom
            transform: translateY(
              -${isHovered ? 0 : yOffset * (recentToasts.length - 1)}px
            );
          `,
          {
            [css`
              height: ${toastInset * 2 +
              notifBarSpacing +
              toastHeights.reduce(
                (sum, x, i) => (i < shortStackCount ? sum + x + gap : sum),
                0,
              )}px;
            `]: isHovered,
          },
        )}
      >
        <TransitionGroup enter exit component={null}>
          {recentToasts
            .reverse() // reversing so they're in the DOM with most recent first
            .map(([id, { onClose, className, ...toastProps }], index) => {
              // const i_fromBottom = indexFromBottom(index);
              const toastRef = getToastRef(id);
              const hoveredYPosition =
                toastHeights.reduce(
                  (sum, x, j) =>
                    // if the comparing toast is below the current toast
                    // but also less than the shortStackCount
                    // add that toast's height to this toast's offset
                    j > index && j < shortStackCount ? sum + x + gap : sum,
                  0,
                ) + notifBarSpacing;

              return (
                <Transition
                  mountOnEnter
                  unmountOnExit
                  onExited={handleTransitionExit}
                  key={id}
                  timeout={transitionDuration.default}
                >
                  {state => (
                    <InternalToast
                      key={id}
                      ref={toastRef}
                      onClose={e => handleClose(id, e)}
                      index={index}
                      isHovered={isHovered}
                      className={cx(
                        toastClassName,
                        getToastTransitionStyles({
                          state,
                          theme,
                          indexFromTop: index,
                        }),
                        {
                          [css`
                            /**
                            * When not hovered,
                            * Set the max-height of all toasts
                            * to the height of the top-most toast
                            */
                            max-height: ${toastHeights[0]}px;
                            color: ${index > 0
                              ? toastBGColor[theme]
                              : 'initial'} !important;
                          `]: !isHovered,
                          [css`
                            max-height: ${toastHeights[index] * 2}px;
                            background-color: ${toastBGColor[theme]};
                            transform: translate3d(
                              0,
                              -${hoveredYPosition}px,
                              0
                            );
                          `]: isHovered,
                        },
                        className,
                      )}
                      {...toastProps}
                      description={
                        // TODO: Remove debug strings
                        toastProps.description + ` (${id} index #${index}.)`
                      }
                    />
                  )}
                </Transition>
              );
            })}
        </TransitionGroup>
        <Transition in={showNotifBar} timeout={transitionDuration.slower}>
          {state => (
            <NotificationBar
              count={remainingToasts.length}
              onClick={() => {}}
              className={notificationBarTransitionStyles[state]}
            />
          )}
        </Transition>
      </div>
    </Portal>
  );
};
