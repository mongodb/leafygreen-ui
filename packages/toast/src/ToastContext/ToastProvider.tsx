import React from 'react';

import { ToastContainer } from '../ToastContainer/ToastContainer';

import { ToastContext } from './ToastContext';
import { useToastReducer } from './ToastReducer';

export const ToastProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { stack, pushToast, popToast, updateToast, getToast } =
    useToastReducer();

  return (
    <ToastContext.Provider
      value={{
        pushToast,
        popToast,
        updateToast,
        getToast,
        getStack: () => stack,
      }}
    >
      {children}
      <ToastContainer stack={stack} />
    </ToastContext.Provider>
  );
};
