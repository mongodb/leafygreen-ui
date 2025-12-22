import React, { forwardRef } from 'react';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { IconButton } from '@leafygreen-ui/icon-button';

import { useShowAnimation } from '../useShowAnimation';

import { ChatIconButtonProps } from './ChatIconButton.types';

export const ChatIconButton = forwardRef<
  HTMLButtonElement,
  ChatIconButtonProps
>(
  (
    {
      disabled = false,
      onMouseEnter,
      onMouseLeave,
      ...rest
    }: ChatIconButtonProps,
    fwdRef,
  ) => {
    const { showAnimation, handleMouseEnter, handleMouseLeave } =
      useShowAnimation({
        onMouseEnter,
        onMouseLeave,
      });

    return (
      <IconButton
        {...rest}
        as="button"
        disabled={disabled}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={fwdRef}
      >
        <AssistantAvatar disabled={disabled} showAnimation={showAnimation} />
      </IconButton>
    );
  },
);

ChatIconButton.displayName = 'ChatIconButton';
