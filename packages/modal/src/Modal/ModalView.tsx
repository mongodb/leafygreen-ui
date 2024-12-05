import React, { useEffect, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { CloseIconColor, ModalSize } from './Modal.types';
import {
  animationStyles,
  closeButtonStyles,
  dialogContentStyle,
  sizeStyles,
} from './Dialog.styles';

interface DialogProps extends Omit<HTMLDialogElement, 'children'> {
  children: React.ReactNode;
  closeIconColor: CloseIconColor;
  contentClassName: string;
  darkMode?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  shouldClose: () => boolean;
  size: ModalSize;
}

function CloseButton({
  closeIconColor = CloseIconColor.Default,
  handleClose,
}: {
  closeIconColor: CloseIconColor;
  handleClose?: () => void;
}) {
  const { theme } = useDarkMode();

  return (
    <IconButton
      onClick={handleClose}
      aria-label="Close modal"
      className={closeButtonStyles(theme, closeIconColor)}
    >
      <XIcon />
    </IconButton>
  );
}

export default function Dialog(
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
  }: DialogProps,
  forwardRef: React.Ref<HTMLDialogElement>,
) {
  const { theme } = useDarkMode(darkModeProp);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleClose = () => {
    if (shouldClose()) {
      dialogRef?.current?.close();

      if (setOpen) {
        setOpen(false);
      }
    }
  };

  useEffect(() => {
    if (open && dialogRef.current) {
      dialogRef.current.showModal();
    }

    if (!open && dialogRef.current) {
      handleClose();
    }
  }, [open]);

  const allowedSize = Object.values(ModalSize).includes(sizeProp);
  const size = allowedSize ? sizeProp : ModalSize.Default;

  return (
    <LeafyGreenProvider>
      {/* @ts-ignore */}
      <dialog
        {...rest}
        ref={dialogRef}
        className={cx(
          animationStyles(theme),
          dialogContentStyle,
          sizeStyles[size],
          contentClassName,
        )}
      >
        {children}
        <CloseButton
          handleClose={handleClose}
          closeIconColor={closeIconColor}
        />
      </dialog>
    </LeafyGreenProvider>
  );
}
