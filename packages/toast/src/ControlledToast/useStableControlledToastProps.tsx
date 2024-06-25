import { useCallback, useRef } from 'react';
import isEqual from 'lodash/isEqual';

import { ControlledToastProps } from './ControlledToast.types';

export default function useStableControlledToastProps(
  props: Omit<ControlledToastProps, 'open'>,
) {
  // onClose is the only function prop, so handle it separately here
  // NOTE: Any functions inside props in the toast's title or description can still theoretically cause a render loop
  // unless they use useCallback
  const onCloseRef = useRef(props.onClose);
  onCloseRef.current = props.onClose;

  // A function that maintains a consistent identity and always calls the most recent version of the prop
  const stableOnClose = useCallback<
    NonNullable<ControlledToastProps['onClose']>
  >((...args) => onCloseRef.current?.(...args), []);

  const propsWithStableOnClose = {
    ...props,
    onClose: stableOnClose,
  };

  const lastPropsRef = useRef<Omit<ControlledToastProps, 'open'> | null>(null);
  const lastProps = lastPropsRef.current;
  const stableProps =
    lastProps != null && isEqual(propsWithStableOnClose, lastProps)
      ? lastProps
      : propsWithStableOnClose;
  lastPropsRef.current = stableProps;

  return stableProps;
}
