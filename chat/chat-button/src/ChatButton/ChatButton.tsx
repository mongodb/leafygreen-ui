import React, { forwardRef } from 'react';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { Button } from '@leafygreen-ui/button';
import SparkleIcon from '@leafygreen-ui/icon/dist/Sparkle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { getButtonStyles } from './ChatButton.styles';
import { ChatButtonProps, Variant } from './ChatButton.types';

export const ChatButton = forwardRef<HTMLButtonElement, ChatButtonProps>(
  (
    {
      children,
      className,
      variant = Variant.Default,
      ...rest
    }: ChatButtonProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode(rest.darkMode);

    const isDefaultVariant = variant === Variant.Default;

    return (
      <Button
        {...rest}
        as="button"
        className={getButtonStyles({ className, theme, variant })}
        leftGlyph={isDefaultVariant ? <AssistantAvatar /> : <SparkleIcon />}
        ref={fwdRef}
        variant={variant}
      >
        {children}
      </Button>
    );
  },
);

ChatButton.displayName = 'ChatButton';
