import React, { useEffect } from 'react';

import { InternalToastProps } from '../InternalToast';
import { useToast } from '../ToastContext/useToast';

export const Toast = (props: InternalToastProps) => {
  const { pushToast } = useToast();

  useEffect(() => {
    pushToast(props);
  }, []);

  return <></>;
};
