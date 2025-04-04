import React, { useCallback, useEffect, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import {
  useEscapeKey,
  useIdAllocator,
  useMergeRefs,
} from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { PopoverProvider } from '@leafygreen-ui/leafygreen-provider';

import CloseButton from '../CloseButton';
import { DEFAULT_LGID_ROOT, getLgIds } from '../constants';

import { modalStyles } from './Modal.styles';
import { ModalProps, ModalSize } from './Modal.types';

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
      className,
      closeIconColor,
      darkMode: darkModeProp,
      id: idProp,
      open,
      setOpen,
      shouldClose = () => true,
      size: sizeProp = ModalSize.Default,
      portalRef,
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    }: ModalProps,
    forwardRef: React.Ref<HTMLDialogElement>,
  ) => {
    const { theme } = useDarkMode(darkModeProp);
    const localRef = useRef<HTMLDialogElement>(null);
    const id = useIdAllocator({ prefix: 'modal', id: idProp });
    const lgIds = getLgIds(dataLgId);
    const portalContainer = useRef<HTMLDivElement>(
      document.createElement('div'),
    );

    const mergedRef = useMergeRefs<HTMLDialogElement>([localRef, forwardRef]);

    const consumerSetClose = useCallback(() => {
      if (shouldClose() && setOpen) {
        setOpen(false);
      }
    }, [shouldClose, setOpen]);

    const handleClose = useCallback(() => {
      if (shouldClose() && localRef.current != null) {
        localRef.current?.close();

        consumerSetClose();
      }
    }, [shouldClose, consumerSetClose]);

    useEffect(() => {
      if (localRef.current != null) {
        if (open) {
          localRef.current?.showModal();
        } else {
          handleClose();
        }
      }
    }, [open, localRef, handleClose]);

    useEffect(() => {
      if (open && localRef.current != null) {
        localRef.current.appendChild(portalContainer.current);
        portalContainer.current.id = 'lg--modal-dialog-portal';

        // Expose the portal container via the ref
        if (portalRef) {
          portalRef.current = portalContainer.current;
        }
      }
    }, [open, localRef, portalRef]);

    const allowedSize = Object.values(ModalSize).includes(sizeProp);
    const size = allowedSize ? sizeProp : ModalSize.Default;

    // Escape key behavior handled by dialog element, out-of-the-box
    // But to help keep consumer state in sync, we'll also listen for the escape key
    useEscapeKey(consumerSetClose, { enabled: open });

    return (
      <PopoverProvider>
        <LeafyGreenProvider
          popoverPortalContainer={{
            portalContainer: portalContainer.current,
            scrollContainer: portalContainer.current,
          }}
        >
          <dialog
            {...rest}
            id={id}
            data-testid={lgIds.root}
            data-lgid={lgIds.root}
            ref={mergedRef}
            className={cx(modalStyles(theme, size), className)}
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

export default Modal;
