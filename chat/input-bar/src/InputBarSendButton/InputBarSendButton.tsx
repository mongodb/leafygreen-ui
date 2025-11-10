import React, { forwardRef } from 'react';

import ArrowUpIcon from '@leafygreen-ui/icon/dist/ArrowUp';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getIconButtonStyles } from '../shared.styles';

import { InputBarSendButtonProps } from './InputBarSendButton.types';

export const InputBarSendButton = forwardRef<
  HTMLButtonElement,
  InputBarSendButtonProps
>(({ disabled, ...rest }, fwdRef) => {
  const { theme } = useDarkMode();

  return (
    <IconButton
      aria-label="Send message"
      className={getIconButtonStyles({ disabled, theme })}
      disabled={disabled}
      ref={fwdRef}
      type="submit"
      {...rest}
    >
      <ArrowUpIcon />
    </IconButton>
  );
});

InputBarSendButton.displayName = 'InputBarSendButton';
