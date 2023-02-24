import React from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';
import { transitionDuration } from '@leafygreen-ui/tokens';

import Toast from '../Toast/Toast';
import { toastTransitionStateStyles } from '../Toast/Toast.styles';

import { ToastContext } from './ToastContext';
import { useToastReducer } from './ToastReducer';

const portalClassName = createUniqueClassName('toast-portal');

export const ToastProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const regionId = useIdAllocator({ id: 'lg-toast-region' });
  const { stack, pushToast, popToast, updateToast, getToast } =
    useToastReducer();

  return (
    <ToastContext.Provider
      value={{ pushToast, popToast, updateToast, getToast }}
    >
      {children}

      <Portal className={portalClassName}>
        <div id={regionId} role="status" aria-live="polite" aria-relevant="all">
          <TransitionGroup appear exit component={null}>
            {Array.from(stack).map(([id, props]) => {
              return (
                <Transition key={id} timeout={transitionDuration.default}>
                  {state => (
                    <Toast
                      open={true}
                      onClose={() => {
                        props.onClose?.({});
                        popToast(id);
                      }}
                      className={toastTransitionStateStyles[state]}
                      {...props}
                      description={id}
                    />
                  )}
                </Transition>
              );
            })}
          </TransitionGroup>
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};
