import React, { useEffect, useState } from 'react';
import defaultsDeep from 'lodash/defaultsDeep';

import { defaultToastProps } from '../InternalToast/defaultProps';
import { ToastId } from '../ToastContext/ToastContext.types';
import { useToast } from '../ToastContext/useToast';

import { ControlledToastProps } from './ControlledToast.types';

/**
 * A controlled toast component.
 *
 * To use this component, you must manage the `open` state yourself.
 *
 * It's recommended to use the hook `useToast` instead
 */
export const Toast = ({ open, ...props }: ControlledToastProps) => {
  props = defaultsDeep(props, defaultToastProps);
  const { pushToast, popToast } = useToast();
  const [toastId, setToastId] = useState<ToastId | null>(null);

  useEffect(() => {
    if (open && !toastId) {
      const _id = pushToast(props);
      setToastId(_id);
    } else if (!open && toastId) {
      popToast(toastId);
      setToastId(null);
    }
  }, [open, popToast, props, pushToast, toastId]);

  return <></>;
};
