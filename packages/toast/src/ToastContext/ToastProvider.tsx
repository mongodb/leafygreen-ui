import React from 'react';

import { ToastContext } from './ToastContext';
import { useToastReducer } from './ToastReducer';

export const ToastProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const { stack, ...actions } = useToastReducer();

  return (
    <ToastContext.Provider value={actions}>
      {children}
      {Array.from(stack).map(([id, props]) => {
        return (
          <div key={id}>
            {id} {props.title}
          </div>
        );
      })}
    </ToastContext.Provider>
  );
};
