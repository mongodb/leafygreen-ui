import React from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import Portal from '@leafygreen-ui/portal';

import Toast from '../Toast/Toast';

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
          {Array.from(stack).map(([id, props]) => {
            return (
              <Toast
                key={id}
                open={true}
                onClose={() => popToast(id)}
                {...props}
                description={id}
              />
            );
          })}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};
