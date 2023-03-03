import React, { SyntheticEvent, useRef, useState } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';
import {
  useDynamicRefs,
  useIdAllocator,
  useMutationObserver,
} from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';
import { spacing, transitionDuration } from '@leafygreen-ui/tokens';

import { gap, notificationBarHeight } from '../../constants';
import { InternalToast } from '../../InternalToast';
import { ToastId, ToastStack } from '../ToastContext.types';
import { useToast } from '..';

import { NotificationBar } from './NotificationBar/NotificationBar';
import { notificationBarTransitionStyles } from './NotificationBar/NotificationBar.styles';
import { getDividedStack } from './utils/getDividedStack';
import {
  getContainerHoverStyles,
  getContainerStatefulStyles,
  getToastHoverStyles,
  getToastTransitionStyles,
  getToastUnhoveredStyles,
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

  /**
   * Callback passed into the InternalToast component as `onClose`
   * Also fired when timeout timers expires
   */
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

  /**
   * Callback fired when the <Transition> element exits
   */
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
          getContainerStatefulStyles({
            isHovered,
            topToastHeight: toastHeights[0],
            recentToastsLength: recentToasts.length,
          }),
          {
            [getContainerHoverStyles({
              toastHeights,
              bottomOffset: notifBarSpacing,
            })]: isHovered,
          },
        )}
      >
        <TransitionGroup enter exit component={null}>
          {recentToasts
            .reverse() // reversing so they're in the DOM with most recent first
            .map(([id, { onClose, className, ...toastProps }], index) => {
              const toastRef = getToastRef(id);

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
                          [getToastUnhoveredStyles({
                            theme,
                            index,
                            toastHeights,
                          })]: !isHovered,
                          [getToastHoverStyles({
                            index,
                            toastHeights,
                            theme,
                            bottomOffset: notifBarSpacing,
                          })]: isHovered,
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
