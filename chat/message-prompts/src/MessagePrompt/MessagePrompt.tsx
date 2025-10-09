import React, { ForwardedRef, forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { useMessagePromptsContext } from '../MessagePromptsContext';

import { getButtonStyles } from './MessagePrompt.styles';
import { MessagePromptProps } from './MessagePrompt.types';

export const MessagePrompt = forwardRef(
  (
    {
      children,
      onClick,
      disabled: disabledProp,
      selected,
      className,
      darkMode: darkModeProp,
      ...rest
    }: MessagePromptProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const { hasSelectedPrompt } = useMessagePromptsContext();
    const { theme } = useDarkMode(darkModeProp);
    const disabled = disabledProp ?? (!selected && hasSelectedPrompt);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || !onClick) return;

      onClick(e);
    };

    return (
      <button
        className={getButtonStyles({
          className,
          disabled,
          selected,
          theme,
        })}
        onClick={handleClick}
        aria-disabled={!!disabled}
        aria-pressed={!!selected}
        tabIndex={selected || disabled ? -1 : 0}
        ref={ref}
        type="button"
        {...rest}
      >
        <Body style={{ color: 'inherit' }}>{children}</Body>
      </button>
    );
  },
);

MessagePrompt.displayName = 'MessagePrompt';
