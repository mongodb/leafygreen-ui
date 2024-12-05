import React from 'react';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import XIcon from '@leafygreen-ui/icon/dist/X';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { LGIDS_MODAL } from '../constants';
import { CloseIconColor } from '../Modal/Modal.types';
import { closeButtonStyles } from './CloseButton.styles';
import { CloseButtonProps } from './CloseButton.types';

export default function CloseButton({
  closeIconColor = CloseIconColor.Default,
  handleClose,
}: CloseButtonProps) {
  const { theme } = useDarkMode();
  const closeId = useIdAllocator({ prefix: 'modal' });

  return (
    <IconButton
      id={closeId}
      data-testid={LGIDS_MODAL.close}
      onClick={handleClose}
      aria-label="Close modal"
      className={closeButtonStyles(theme, closeIconColor)}
    >
      <XIcon />
    </IconButton>
  );
}
