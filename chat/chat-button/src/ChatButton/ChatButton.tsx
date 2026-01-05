import React, { forwardRef } from 'react';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { Button } from '@leafygreen-ui/button';
import SparkleIcon from '@leafygreen-ui/icon/dist/Sparkle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { useShowAnimation } from '../useShowAnimation';

import { getButtonStyles } from './ChatButton.styles';
import { ChatButtonProps, Variant } from './ChatButton.types';

export const ChatButton = forwardRef<HTMLButtonElement, ChatButtonProps>(
  (
    {
      children,
      className,
      disabled = false,
      onMouseEnter,
      onMouseLeave,
      variant = Variant.Default,
      ...rest
    }: ChatButtonProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode(rest.darkMode);

    const isDefaultVariant = variant === Variant.Default;

    const { showAnimation, handleMouseEnter, handleMouseLeave } =
      useShowAnimation({
        enabled: isDefaultVariant,
        onMouseEnter,
        onMouseLeave,
      });

    const renderLeftGlyph = () => {
      if (!isDefaultVariant) {
        return <SparkleIcon />;
      }

      return (
        <AssistantAvatar disabled={disabled} showAnimation={showAnimation} />
      );
    };

    return (
      <Button
        {...rest}
        as="button"
        className={getButtonStyles({
          className,
          disabled,
          showAnimation,
          theme,
          variant,
        })}
        disabled={disabled}
        leftGlyph={renderLeftGlyph()}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={fwdRef}
        variant={variant}
      >
        {children}
      </Button>
    );
  },
);

ChatButton.displayName = 'ChatButton';
