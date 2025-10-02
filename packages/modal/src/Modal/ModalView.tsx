import React, { useCallback, useEffect, useState } from 'react';

import {
  useEscapeKey,
  useIdAllocator,
  useMergeRefs,
} from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
  usePopoverContext,
} from '@leafygreen-ui/leafygreen-provider';

import { CloseButton } from '../CloseButton';
import { CloseIconColor } from '../shared.types';
import { focusModalChildElement } from '../utils';
import { getLgIds } from '../utils';

import { getDialogStyles, portalContainerStyles } from './Modal.styles';
import { ModalProps, ModalSize } from './Modal.types';

/**
 * @internal
 * Internal Modal View component
 *
 * @remarks
 * This component is intended to be used within the context of the `PopoverProvider`
 * created in `Modal.tsx`. It relies on the PopoverContext to determine if a popover is
 * open in order to determine if the modal should be closed when the escape key is pressed.
 * Do not use `ModalView` directly—always use the `Modal` component, which ensures the
 * correct context is provided.
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
    const { isPopoverOpen } = usePopoverContext();

    const [dialogEl, setDialogEl] = useState<HTMLDialogElement | null>(null);
    const [portalContainerEl, setPortalContainerEl] =
      useState<HTMLDivElement | null>(null);

    const dialogRef = useMergeRefs([fwdRef, setDialogEl]);

    const handleClose = useCallback(() => {
      if (shouldClose()) {
        setOpen(false);
      }
    }, [setOpen, shouldClose]);

    const id = useIdAllocator({ prefix: 'modal', id: idProp });
    const lgIds = getLgIds(dataLgId);

    useEscapeKey(handleClose, { enabled: open && !isPopoverOpen });

    useEffect(() => {
      if (!dialogEl) return;

      if (open && !dialogEl.open) {
        dialogEl.showModal();
        focusModalChildElement(dialogEl);
      } else {
        dialogEl.close();
      }
    }, [dialogEl, open]);

    const allowedSize = Object.values(ModalSize).includes(sizeProp);
    const size = allowedSize ? sizeProp : ModalSize.Default;

    return (
      <LeafyGreenProvider
        darkMode={darkMode}
        popoverPortalContainer={{
          portalContainer: portalContainerEl,
          scrollContainer: portalContainerEl,
        }}
      >
        <dialog
          data-testid={lgIds.root}
          data-lgid={lgIds.root}
          {...rest}
          ref={dialogRef}
          id={id}
          className={getDialogStyles({
            backdropClassName,
            className,
            size,
            theme,
          })}
          /**
           * Prevents the default <dialog> cancel behavior (ESC key) to ensure
           * the modal only closes via the custom escape key handler logic.
           */
          // @ts-ignore React17 - `onCancel` is unavailable in React 17 types
          onCancel={e => e.preventDefault()}
        >
          {children}
          <CloseButton
            data-lgid={lgIds.close}
            data-testid={lgIds.close}
            closeIconColor={closeIconColor}
            onClick={handleClose}
          />
          {/* Backdrop portal container for floating elements that need to escape dialog overflow */}
          {open && dialogEl && (
            <div className={portalContainerStyles} ref={setPortalContainerEl} />
          )}
        </dialog>
      </LeafyGreenProvider>
    );
  },
);

ModalView.displayName = 'ModalView';
export default ModalView;
