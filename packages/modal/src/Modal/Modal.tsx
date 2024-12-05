import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useEscapeKey, useMergeRefs } from '@leafygreen-ui/hooks';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { PopoverProvider } from '@leafygreen-ui/leafygreen-provider';

import CloseButton from '../CloseButton';
import { CloseIconColor, ModalSize, ModalProps } from './Modal.types';
import { modalStyles } from './Modal.styles';

/**
 *
 *  Modals place content on top of main window.
 *
 * @param props.open Boolean to describe whether or not Modal is open.
 * @param props.size String to determine size of Modal. ['small', 'default', 'large']
 * @param props.setOpen Callback to change the open state of Modal.
 * @param props.children Content to appear inside of Modal container.
 * @param props.shouldClose Callback to determine whether or not Modal should close when user tries to close it.
 * @param props.className className applied to container div.
 * @param props.contentClassName className applied to overlay div.
 * @param props.initialFocus By default, when a focus trap is activated the first element in the focus trap's tab order will receive focus. With this option you can specify a different element to receive that initial focus. Selector string (which will be passed to document.querySelector() to find the DOM node).
 * @param props.closeIconColor Choose between dark or light close icon. Default is dark.
 */
const Modal = React.forwardRef(
  (
    {
      children,
      closeIconColor,
      contentClassName,
      darkMode: darkModeProp,
      open,
      setOpen,
      shouldClose = () => true,
      size: sizeProp = ModalSize.Default,
      ...rest
    }: ModalProps,
    forwardRef: React.Ref<HTMLDialogElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const localRef = useRef<HTMLDialogElement>(null);
    const mergedRef = useMergeRefs<HTMLDialogElement>([localRef, forwardRef]);

    const consumerSetClose = () => {
      if (shouldClose() && setOpen) {
        setOpen(false);
      }
    };

    const handleClose = () => {
      if (shouldClose() && localRef.current != null) {
        localRef.current?.close();

        consumerSetClose();
      }
    };

    useEffect(() => {
      if (localRef.current != null) {
        if (open) {
          localRef.current?.showModal();
        }

        if (!open) {
          handleClose();
        }
      }
    }, [open, localRef, handleClose]);

    const allowedSize = Object.values(ModalSize).includes(sizeProp);
    const size = allowedSize ? sizeProp : ModalSize.Default;

    // Escape key behavior handled by dialog element, out-of-the-box
    // But to help keep consumer state in sync, we'll also listen for the escape key
    useEscapeKey(consumerSetClose, { enabled: open });

    return (
      <PopoverProvider>
        <LeafyGreenProvider>
          <dialog
            {...rest}
            ref={mergedRef}
            className={cx(modalStyles(theme, size), contentClassName)}
          >
            {children}
            <CloseButton
              handleClose={handleClose}
              closeIconColor={closeIconColor}
            />
          </dialog>
        </LeafyGreenProvider>
      </PopoverProvider>
    );
  },
);

Modal.displayName = 'Modal';

Modal.propTypes = {
  open: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(ModalSize)),
  children: PropTypes.node,
  shouldClose: PropTypes.func,
  className: PropTypes.string,
  setOpen: PropTypes.func,
  darkMode: PropTypes.bool,
  closeIconColor: PropTypes.oneOf(Object.values(CloseIconColor)),
};

export default Modal;
