import React, { forwardRef, useEffect, useState } from 'react';

import { AssistantAvatar } from '@leafygreen-ui/avatar';
import { Button } from '@leafygreen-ui/button';
import SparkleIcon from '@leafygreen-ui/icon/dist/Sparkle';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import {
  getButtonStyles,
  SHIMMER_TRANSITION_DURATION,
} from './ChatButton.styles';
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
    const [isInitialAnimation, setIsInitialAnimation] =
      useState(isDefaultVariant);
    const [isHovered, setIsHovered] = useState(false);

    const showAnimation = isInitialAnimation || isHovered;

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDefaultVariant) {
        setIsHovered(true);
      }
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isDefaultVariant) {
        setIsHovered(false);
      }
      onMouseLeave?.(e);
    };

    const renderLeftGlyph = () => {
      if (!isDefaultVariant) {
        return <SparkleIcon />;
      }

      return (
        <AssistantAvatar disabled={disabled} showAnimation={showAnimation} />
      );
    };

    // Turn off animation after initial animation loop
    useEffect(() => {
      if (!isDefaultVariant) return;

      const timer = setTimeout(() => {
        setIsInitialAnimation(false);
      }, SHIMMER_TRANSITION_DURATION);

      return () => clearTimeout(timer);
    }, [isDefaultVariant]);

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
