import React from 'react';

import { PopoverProvider } from '@leafygreen-ui/leafygreen-provider';

import { ModalProps } from './Modal.types';
import ModalView from './ModalView';

/**
 * Modal component for displaying content in a dialog overlay.
 *
 * @param props.backdropClassName **@deprecated** _(optional)_ Applies a className to the Modal backdrop. Use the CSS `::backdrop` pseudo-element instead. This prop will be removed in a future version.
 * @param props.children Content to render inside the Modal.
 * @param props.className _(optional)_ Applies a className to the Modal dialog element.
 * @param props.closeIconColor Optional color for the close icon. One of `'default'` or `'light'`. Defaults to `'default'`.
 * @param props.open Controls whether the Modal is open.
 * @param props.setOpen Callback to update the open state.
 * @param props.shouldClose Optional callback to determine if the Modal should close when a close action is triggered.
 * @param props.size Optional size of the Modal. One of `'small'`, `'default'`, or `'large'`. Defaults to `'default'`.
 */
const Modal = React.forwardRef<HTMLDialogElement, ModalProps>(
  (props, fwdRef) => {
    return (
      <PopoverProvider>
        <ModalView {...props} ref={fwdRef} />
      </PopoverProvider>
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
