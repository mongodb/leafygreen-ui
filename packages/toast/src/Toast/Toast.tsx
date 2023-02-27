import React, { useEffect } from 'react';

import { useToast } from '../ToastContext/useToast';

import { ToastComponentProps } from './ToastComponentProps.types';

export const Toast = (props: ToastComponentProps) => {
  const { pushToast } = useToast();

  useEffect(() => {
    pushToast(props);
  }, []);

  return <></>;
};
