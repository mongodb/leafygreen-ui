import { useEffect, useRef } from 'react';
import defaultsDeep from 'lodash/defaultsDeep';

import { defaultToastProps } from '../InternalToast/defaultProps';
import { ToastId, useToast } from '../ToastContext';

import { ControlledToastProps } from './ControlledToast.types';
import useStableControlledToastProps from './useStableControlledToastProps';

/**
 * A controlled toast component.
 *
 * To use this component, you must manage the `open` state yourself.
 *
 * It's recommended to use the hook `useToast` instead
 */
export const ControlledToast = ({ open, ...props }: ControlledToastProps) => {
  props = defaultsDeep(props, defaultToastProps);
  const { pushToast, popToast, updateToast } = useToast();
  const toastIdRef = useRef<ToastId | null>(null);

  const stableProps = useStableControlledToastProps(props);

  useEffect(() => {
    const toastId = toastIdRef.current;

    if (open) {
      if (toastId == null) {
        toastIdRef.current = pushToast({ isControlled: true, ...stableProps });
      } else {
        updateToast(toastId, stableProps);
      }
    } else if (!open && toastId) {
      popToast(toastId);
      toastIdRef.current = null;
    }
  }, [open, popToast, pushToast, updateToast, stableProps]);

  useEffect(() => {
    return () => {
      // Remove toast on unmount
      if (toastIdRef.current != null) {
        popToast(toastIdRef.current);
      }
    };
  }, [popToast]);

  return null;
};
