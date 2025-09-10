import React, { FocusEvent, useRef } from 'react';
import { TimeInputInputProps } from './TimeInputInput.types';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { getBaseStyles } from './TimeInputInput.styles';

import { TimeInputState } from '../TimeInput/TimeInput.types';

export function TimeInputInput({ className }: TimeInputInputProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useDarkMode();

  // Placeholders for now
  const state = TimeInputState.None;
  const disabled = false;
  const hasSelectOptions = true;

  const handleFocus = () => {};
  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {};

  return (
    <div
      ref={containerRef}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={getBaseStyles({
        theme,
        disabled,
        state,
        className,
        hasSelectOptions,
      })}
    ></div>
  );
}

TimeInputInput.displayName = 'TimeInputInput';
