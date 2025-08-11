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
import { CodeEditorCopyButtonProps } from './CodeEditorCopyButton.types';
import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';

/**
 * A copy button component.
 * Provides functionality to copy text content to the clipboard with visual feedback.
 *
 * @example
 * ```tsx
 * <CodeEditorCopyButton
 *   getContents={() => "console.log('Hello World')"}
 *   onCopy={() => console.log('Content copied!')}
 *   isPanelVariant={false}
 * />
 * ```
 */
export function CodeEditorCopyButton({
  onCopy,
  getContents,
  className,
  isPanelVariant,
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
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(getContents());
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = getContents();
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
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
      showPanel: isPanelVariant ?? false,
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
        isPanelVariant ? (
          <IconButton {...sharedButtonProps}>
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
