import React, { useMemo } from 'react';

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

  const value = useMemo(() => {
    return { ...toastFns };
  }, [toastFns]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer stack={stack} portalClassName={portalClassName} />
    </ToastContext.Provider>
  );
};
