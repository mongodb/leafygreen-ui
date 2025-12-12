import React, { useRef, useState } from 'react';

import { useBackdropClick } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import { palette } from '@leafygreen-ui/palette';
import { color, spacing } from '@leafygreen-ui/tokens';
import {
  Align,
  hoverDelay,
  Justify,
  RenderMode,
  Tooltip,
  TooltipVariant,
} from '@leafygreen-ui/tooltip';

import { CopyButtonTrigger } from '../CodeEditorCopyButtonTrigger';

import { getCopyButtonStyles } from './CodeEditorCopyButton.styles';
import {
  CodeEditorCopyButtonProps,
  CopyButtonVariant,
} from './CodeEditorCopyButton.types';
import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';

/**
 * A copy button component.
 * Provides functionality to copy text content to the clipboard with visual feedback.
 *
 * Note: this is visually a copy from the `Code` component's copy button and in
 * many ways, implements the same logic. Though we'd like to make a copy button
 * that's exposed to consumers and shared, it was decided to duplicate for now
 * until we have time to think thought the API.
 *
 * @example
 * ```tsx
 * <CodeEditorCopyButton
 *   getContentsToCopy={() => "console.log('Hello World')"}
 *   onCopy={() => console.log('Content copied!')}
 *   variant={CopyButtonVariant.Button}
 * />
 * ```
 */
export function CodeEditorCopyButton({
  onCopy,
  getContentsToCopy,
  className,
  variant = CopyButtonVariant.Button,
  disabled,
  ...rest
}: CodeEditorCopyButtonProps) {
  const [copied, setCopied] = useState(false);
  /**
   * `CodeEditorCopyButton` controls `tooltipOpen` state because when `copied` state
   * changes, it causes the tooltip to re-render
   */
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useDarkMode();

  /**
   * Gets the appropriate icon fill color based on theme and copied state
   */
  const getIconFill = () => {
    if (copied) {
      return theme === 'light' ? palette.white : palette.gray.dark3;
    }

    return disabled ? undefined : color[theme].icon.primary.default;
  };

  /**
   * toggles `tooltipOpen` state
   */
  const closeTooltip = () => setTooltipOpen(false);
  const openTooltip = () => setTooltipOpen(true);

  /**
   * forcibly closes tooltip if user tabs focus on tooltip and clicks
   * outside of the trigger
   */
  useBackdropClick(closeTooltip, buttonRef, {
    enabled: tooltipOpen,
  });

  /**
   * Copies the content to the clipboard using the modern Clipboard API.
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getContentsToCopy());
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  /**
   * Handles the click event on the copy button.
   * Performs the copy operation and manages the visual feedback state.
   */
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await copyToClipboard();
    onCopy?.();
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, COPIED_SUCCESS_DURATION);
  };

  /**
   * Handles keyboard interactions for the copy button.
   * Supports Enter and Space keys to trigger the copy action.
   */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case keyMap.Escape:
      case keyMap.Tab: {
        closeTooltip();
        break;
      }

      case keyMap.Enter:
      case keyMap.Space: {
        e.preventDefault();
        buttonRef.current?.click();
        buttonRef.current?.focus();
        break;
      }
    }
  };

  /**
   * `handleMouseEnter` and `handleMouseLeave` are used to control `tooltipOpen`
   * state when mouse hovers over tooltip trigger
   */
  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => {
      openTooltip();
    }, hoverDelay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    closeTooltip();
  };

  /**
   * `shouldClose` indicates to `Tooltip` component that tooltip should
   * remain open even if trigger re-renders
   */
  const shouldClose = () => !tooltipOpen;

  const sharedButtonProps = {
    'aria-label': COPY_TEXT,
    className: getCopyButtonStyles({
      theme,
      copied,
      variant,
      className,
    }),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    disabled,
    ...rest,
  } as const;

  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      open={tooltipOpen}
      renderMode={RenderMode.TopLayer}
      setOpen={setTooltipOpen}
      darkMode={theme === 'dark'}
      spacing={spacing[100]}
      trigger={
        <CopyButtonTrigger
          variant={variant}
          copied={copied}
          iconFill={getIconFill()}
          {...sharedButtonProps}
          ref={buttonRef}
        />
      }
      shouldClose={shouldClose}
      variant={TooltipVariant.Compact}
    >
      {copied ? COPIED_TEXT : COPY_TEXT}
    </Tooltip>
  );
}

CodeEditorCopyButton.displayName = 'CodeEditorCopyButton';
