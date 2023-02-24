import React from 'react';

import { ToastContextProps } from './ToastContext.types';

export const ToastContext = React.createContext<ToastContextProps>({
  pushToast: () => '',
  popToast: () => undefined,
  updateToast: () => undefined,
  getToast: () => undefined,
  getStack: () => undefined,
});
