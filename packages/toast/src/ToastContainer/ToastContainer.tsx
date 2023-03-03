import React, { SyntheticEvent, useCallback, useRef, useState } from 'react';
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
  toastInset,
} from '../constants';
import { InternalToast, toastBGColor } from '../InternalToast';
import { useToast } from '../ToastContext';
import { ToastId, ToastStack } from '../ToastContext/ToastContext.types';

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
  // const indexFromBottom = (i: number) => recentToasts.length - 1 - i;

  const showNotifBar = isHovered && remainingToasts.length > 0;
  const notifBarSpacing = showNotifBar ? notificationBarHeight + gap : 0;

  const handleClose = (id: ToastId, e?: SyntheticEvent) => {
    const toast = stack.get(id);

    if (toast) {
      // We only self-close the toast if it's not externally controlled
      if (!toast.isControlled) {
        popToast(id);
      }
      toast.onClose?.(e);
    }
  };

  useTimers({
    stack,
    isHovered,
    callback: handleClose,
  });

  const calcToastHeights = useCallback(() => {
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
  }, [getToastRef, stack]);

  const [toastHeights, setToastHeights] = useState<Array<number>>([]);

  useMutationObserver(
    toastContainerRef.current,
    {
      childList: true,
      attributes: true,
      subtree: true,
    },
    () => setToastHeights(calcToastHeights()),
  );

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
        className={cx(
          toastContainerStyles,
          css`
            // The height of the first toast + inset
            height: ${toastInset * 2 + toastHeights[0]}px;
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
                        // TODO: Remove debug comments
                        `${id} index #${index}. ` +
                        // ` (${i_fromBottom} from bottom)` +
                        // ` scrollHeight ${toastRef?.current?.scrollHeight} ` +
                        // ` clientHeight ${toastRef?.current?.clientHeight} ` +
                        // ` saved height: ${toastHeights[index]}` +
                        // ` Offest ${hoveredYPosition} ` +
                        toastProps.description
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
