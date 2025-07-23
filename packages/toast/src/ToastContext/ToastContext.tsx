import React from 'react';

import { ToastContextProps } from './ToastContext.types';

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
