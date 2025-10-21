import React, { forwardRef } from 'react';

import StopIcon from '@leafygreen-ui/icon/dist/Stop';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getIconButtonStyles } from '../shared.styles';

import { InputBarStopButtonProps } from './InputBarStopButton.types';

export const InputBarStopButton = forwardRef<
  HTMLButtonElement,
  InputBarStopButtonProps
>(({ disabled, onClick }, fwdRef) => {
  const { theme } = useDarkMode();

  return (
    <IconButton
      aria-label="Stop message"
      className={getIconButtonStyles({ disabled: !!disabled, theme })}
      disabled={disabled}
      onClick={onClick}
      ref={fwdRef}
      type="button"
    >
      <StopIcon />
    </IconButton>
  );
});

InputBarStopButton.displayName = 'InputBarStopButton';
