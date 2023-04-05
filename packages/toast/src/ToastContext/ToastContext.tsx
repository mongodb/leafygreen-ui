import React from 'react';

import { ToastContainer } from '../ToastContainer';

import { ToastContextProps, ToastProviderProps } from './ToastContext.types';
import { useToastReducer } from './ToastReducer';

export const ToastContext = React.createContext<ToastContextProps>({
  pushToast: () => '',
  popToast: () => undefined,
  updateToast: () => undefined,
  getToast: () => undefined,
  getStack: () => undefined,
  clearStack: () => {},
});

export const ToastProvider = ({
  children,
  initialValue,
}: React.PropsWithChildren<ToastProviderProps>) => {
  const { stack, pushToast, popToast, updateToast, getToast, clearStack } =
    useToastReducer(initialValue);

  return (
    <ToastContext.Provider
      value={{
        pushToast,
        popToast,
        updateToast,
        getToast,
        getStack: () => stack,
        clearStack,
      }}
    >
      {children}
      <ToastContainer stack={stack} />
    </ToastContext.Provider>
  );
};
