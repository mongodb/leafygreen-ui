import React from 'react';

import { ToastContainer } from '../ToastContainer';

import { ToastContextProps, ToastProviderProps } from './ToastContext.types';
import { useToastReducer } from './ToastReducer';

const initialToastContextValue = {
  pushToast: () => '',
  popToast: () => undefined,
  updateToast: () => undefined,
  getToast: () => undefined,
  getStack: () => undefined,
  clearStack: () => {},
};

export const ToastContext = React.createContext<ToastContextProps>(
  initialToastContextValue,
);

export const ToastProvider = ({
  children,
  initialValue,
}: React.PropsWithChildren<ToastProviderProps>) => {
  const { stack, ...toastFns } = useToastReducer(initialValue);

  return (
    <ToastContext.Provider
      value={{
        ...toastFns,
        getStack: () => stack,
      }}
    >
      {children}
      <ToastContainer stack={stack} />
    </ToastContext.Provider>
  );
};
