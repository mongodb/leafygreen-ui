import React from 'react';

import { ToastContainer } from '../../ToastContainer';
import { ToastContext } from '../ToastContext';
import { ToastProviderProps } from '../ToastContext.types';
import { useToastReducer } from '../ToastReducer';

/**
 * Toast Provider
 */
export const ToastProvider = ({
  children,
  initialValue,
  portalClassName,
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
      <ToastContainer stack={stack} portalClassName={portalClassName} />
    </ToastContext.Provider>
  );
};
