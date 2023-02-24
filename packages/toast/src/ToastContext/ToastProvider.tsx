import React from 'react';

import Toast from '../Toast/Toast';

import { ToastContext } from './ToastContext';
import { useToastReducer } from './ToastReducer';

export const ToastProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { stack, pushToast, popToast, updateToast, getToast } =
    useToastReducer();

  return (
    <ToastContext.Provider
      value={{ pushToast, popToast, updateToast, getToast }}
    >
      {children}
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
    </ToastContext.Provider>
  );
};
