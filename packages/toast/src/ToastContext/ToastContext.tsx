import React from 'react';

import { ToastContainer } from '../ToastContainer/ToastContainer';

import { ToastContextProps } from './ToastContext.types';
import { useToastReducer } from './ToastReducer';

export const ToastContext = React.createContext<ToastContextProps>({
  pushToast: () => '',
  popToast: () => undefined,
  updateToast: () => undefined,
  getToast: () => undefined,
  getStack: () => undefined,
});

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
