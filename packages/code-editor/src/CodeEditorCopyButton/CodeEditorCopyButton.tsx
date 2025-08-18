import React, { useRef, useState } from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import Button from '@leafygreen-ui/button';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import Tooltip, { Align, Justify, RenderMode } from '@leafygreen-ui/tooltip';

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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useDarkMode();

  /**
   * Copies the content to the clipboard using the modern Clipboard API when available,
   * or falls back to the legacy document.execCommand method for older browsers.
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
        break;
      }

      case keyMap.Enter:
      case keyMap.Space: {
        e.preventDefault();
        handleClick(e as any);
        buttonRef.current?.focus();
        break;
      }
    }
  };

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
    ref: buttonRef,
    disabled,
    ...rest,
  } as const;

  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      renderMode={RenderMode.TopLayer}
      triggerEvent="hover"
      trigger={
        variant === CopyButtonVariant.IconButton ? (
          <IconButton {...sharedButtonProps} aria-label="Copy text">
            {copied ? <CheckmarkIcon /> : <CopyIcon />}
            {copied && (
              <VisuallyHidden role="alert">{COPIED_TEXT}</VisuallyHidden>
            )}
          </IconButton>
        ) : (
          <Button
            leftGlyph={copied ? <CheckmarkIcon /> : <CopyIcon />}
            size="xsmall"
            {...sharedButtonProps}
          >
            {copied && (
              <VisuallyHidden role="alert">{COPIED_TEXT}</VisuallyHidden>
            )}
          </Button>
        )
      }
    >
      {copied ? COPIED_TEXT : COPY_TEXT}
    </Tooltip>
  );
}

CodeEditorCopyButton.displayName = 'CodeEditorCopyButton';
