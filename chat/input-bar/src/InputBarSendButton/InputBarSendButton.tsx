import React, { forwardRef } from 'react';

import { Button } from '@leafygreen-ui/button';
import ArrowUpIcon from '@leafygreen-ui/icon/dist/ArrowUp';
import { IconButton } from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getIconButtonStyles } from '../shared.styles';

import { getIconFill } from './InputBarSendButton.styles';
import { InputBarSendButtonProps } from './InputBarSendButton.types';
import { ReturnIcon } from './ReturnIcon';

export const InputBarSendButton = forwardRef<
  HTMLButtonElement,
  InputBarSendButtonProps
>(({ disabled, isCompact, shouldRenderButtonText, ...rest }, fwdRef) => {
  const { theme } = useDarkMode();

  if (!isCompact) {
    return (
      <Button
        size="small"
        rightGlyph={<ReturnIcon fill={getIconFill({ disabled, theme })} />}
        type="submit"
        disabled={disabled}
      >
        {shouldRenderButtonText && 'Enter'}
      </Button>
    );
  }

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
