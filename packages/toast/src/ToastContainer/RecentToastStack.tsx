import React, { SyntheticEvent } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';

import { InternalToast } from '../InternalToast';
import { ToastProps } from '../Toast.types';
import { ToastId } from '../ToastContext/ToastContext.types';

import {
  getToastHoverStyles,
  getToastTransitionStyles,
} from './ToastContainer.styles';

const toastClassName = createUniqueClassName('toast');

export const RecentToastStack = ({
  toasts,
  handleClose,
  isHovered,
  notifBarSpacing,
}: {
  toasts: Array<[string, ToastProps]>;
  handleClose: (id: ToastId, e?: SyntheticEvent) => void;
  notifBarSpacing: number;
  isHovered: boolean;
}) => {
  const { theme } = useDarkMode();
  const indexFromBottom = (i: number) => toasts.length - 1 - i;

  return (
    <TransitionGroup appear exit component={null}>
      {toasts
        .reverse()
        .map(([id, { onClose, className, ...toastProps }], i) => {
          const i_fromBottom = indexFromBottom(i);

          return (
            <Transition key={id} timeout={transitionDuration.default}>
              {state => (
                <InternalToast
                  onClose={e => handleClose(id, e)}
                  className={cx(
                    toastClassName,
                    getToastTransitionStyles({
                      state,
                      theme,
                      indexFromTop: i,
                    }),
                    {
                      [getToastHoverStyles({
                        theme,
                        indexFromBottom: i_fromBottom,
                        offset: notifBarSpacing,
                      })]: isHovered,
                    },
                    className,
                  )}
                  {...toastProps}
                  description={`${id} #${i} in stack (${i_fromBottom} from bottom). Lorem ipsum dolor sit amet.`}
                />
              )}
            </Transition>
          );
        })}
    </TransitionGroup>
  );
};
