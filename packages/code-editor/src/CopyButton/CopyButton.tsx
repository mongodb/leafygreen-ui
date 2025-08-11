import React, { useRef, useState } from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import Button from '@leafygreen-ui/button';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import Tooltip, { Align, Justify, RenderMode } from '@leafygreen-ui/tooltip';

import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';
import { getCopyButtonStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';

function CopyButton({
  onCopy,
  getContents,
  className,
  isPanelVariant,
  disabled,
  ...rest
}: CopyProps) {
  const [copied, setCopied] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useDarkMode();

  const copyToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(getContents());
      } else {
        // Fallback for older browsers or non-secure contexts
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

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    await copyToClipboard();
    onCopy?.();
    setCopied(true);

    // Reset copied state after the duration
    setTimeout(() => {
      setCopied(false);
    }, COPIED_SUCCESS_DURATION);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case keyMap.Escape:
      case keyMap.Tab: {
        // Let Tooltip manage its own open/close on focus/blur
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

CopyButton.displayName = 'CopyButton';

export default CopyButton;
