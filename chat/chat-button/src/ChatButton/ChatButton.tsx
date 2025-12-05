import React, { forwardRef } from 'react';

import { Button } from '@leafygreen-ui/button';

import { ChatButtonProps } from './ChatButton.types';

export const ChatButton = forwardRef<HTMLButtonElement, ChatButtonProps>(
  (props: ChatButtonProps, fwdRef) => {
    return <Button {...props} as="button" ref={fwdRef} />;
  },
);

ChatButton.displayName = 'ChatButton';
