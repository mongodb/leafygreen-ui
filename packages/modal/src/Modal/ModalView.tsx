import React, { useCallback, useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useEscapeKey, useIdAllocator, useMergeRefs } from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { getLgIds } from '../utils';

import {
  baseCloseButtonStyles,
  closeButton,
  getDialogStyles,
} from './Modal.styles';
import {
  CloseIconColor,
  ModalProps,
  ModalSize,
} from './Modal.types';

/**
 * @internal
 * Internal Modal View component
 */
const ModalView = React.forwardRef<HTMLDialogElement, ModalProps>(
  (
    {
      open = false,
      size: sizeProp = ModalSize.Default,
      setOpen = () => {},
      shouldClose = () => true,
      closeIconColor = CloseIconColor.Default,
      darkMode: darkModeProp,
      id: idProp,
      children,
      className,
      backdropClassName,
      'data-lgid': dataLgId,
      ...rest
    },
    fwdRef,
  ) => {
    const { theme, darkMode } = useDarkMode(darkModeProp);
    // const [scrollContainerRef, setScrollContainerRef] = useState<null | HTMLDivElement>(null);
    const [dialogEl, setDialogEl] = useState<HTMLDialogElement | null>(null);
    const dialogRef = useMergeRefs([fwdRef, setDialogEl]);

    const handleClose = useCallback(() => {
      if (shouldClose()) {
        setOpen(false);
      }
    }, [setOpen, shouldClose]);

    const id = useIdAllocator({ prefix: 'modal', id: idProp });
    const closeId = useIdAllocator({ prefix: 'modal' });
    const lgIds = getLgIds(dataLgId);

    // TODO: test closing open popovers in modal with esc key
    // useEscapeKey(handleClose, { enabled: open && !isPopoverOpen });
    useEscapeKey(handleClose, { enabled: open });

    const allowedSize = Object.values(ModalSize).includes(sizeProp);
    const size = allowedSize ? sizeProp : ModalSize.Default;

    // Handle dialog open/close and focus management
    useEffect(() => {
      console.log('dialog', dialogEl);
      if (!dialogEl) return;

      if (open && !dialogEl.open) {
        dialogEl.showModal();
      } else {
        dialogEl.close();
      }
    }, [dialogEl, open]);

    // Handle ESC key and other native dialog events
    // useEffect(() => {
    //   const dialog = dialogEl;
    //   if (!dialog) return;

    //   const handleCancel = (event: Event) => {
    //     // Prevent default ESC behavior if shouldClose returns false
    //     if (!shouldClose()) {
    //       event.preventDefault();
    //     } else {
    //       setOpen(false);
    //     }
    //   };

    //   const handleClose = () => {
    //     setOpen(false);
    //   };

    //   dialog.addEventListener('cancel', handleCancel);
    //   dialog.addEventListener('close', handleClose);

    //   return () => {
    //     dialog.removeEventListener('cancel', handleCancel);
    //     dialog.removeEventListener('close', handleClose);
    //   };
    // }, [shouldClose, setOpen, dialogRef]);

    return (
      <LeafyGreenProvider darkMode={darkMode} popoverPortalContainer={{
        portalContainer: dialogEl,
        scrollContainer: dialogEl,
      }}>
        { }
        <dialog
          {...rest}
          ref={dialogRef}
          id={id}
          data-testid={lgIds.root}
          data-lgid={lgIds.root}
          className={getDialogStyles({
            backdropClassName,
            className,
            size,
            theme,
          })}
        >

          {children}
          <IconButton
            id={closeId}
            data-testid={lgIds.close}
            data-lgid={lgIds.close}
            onClick={handleClose}
            aria-label="Close modal"
            className={cx(
              baseCloseButtonStyles,
              closeButton[theme][closeIconColor],
            )}
          >
            <XIcon />
          </IconButton>
        </dialog>
      </LeafyGreenProvider>
    );
  },
);

ModalView.displayName = 'ModalView';
export default ModalView;
