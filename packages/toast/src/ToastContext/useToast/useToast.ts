import { useContext } from 'react';
import { isUndefined } from 'lodash';

import { ToastContext } from '../ToastContext';
import { ToastContextProps } from '../ToastContext.types';

export const useToast = (): Omit<ToastContextProps, '_hasProvider'> => {
  const context = useContext(ToastContext);
  const hasProvider = !isUndefined(context.getStack());

  if (!hasProvider) {
    console.warn(
      '`useToast` hook must be used within a `ToastProvider` context',
    );
  }

  return context;
};
