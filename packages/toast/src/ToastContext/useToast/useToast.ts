import { useContext } from 'react';

import { ToastContext } from '../ToastContext';
import { ToastContextProps } from '../ToastContext.types';

export const useToast = (): Omit<ToastContextProps, '_hasProvider'> => {
  const { _hasProvider, ...context } = useContext(ToastContext);

  if (!_hasProvider) {
    console.warn(
      '`useToast` hook must be used within a `ToastProvider` context',
    );
  }

  return context;
};
