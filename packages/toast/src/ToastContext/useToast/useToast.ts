import { useContext } from 'react';

import { ToastContext } from '../ToastContext';

export const useToast = () => {
  return useContext(ToastContext);
};
