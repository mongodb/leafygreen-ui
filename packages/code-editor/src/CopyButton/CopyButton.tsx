import React, { useRef, useState } from 'react';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import Button from '@leafygreen-ui/button';
import { useBackdropClick } from '@leafygreen-ui/hooks';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import Tooltip, {
  Align,
  hoverDelay,
  Justify,
  RenderMode,
} from '@leafygreen-ui/tooltip';

import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';
import { getCopyButtonStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';

// Temporary stubs until code-editor integrates a context for these values
const useLocalContext = () => ({ isLoading: false });

function CopyButton({
  onCopy,
  getContents,
  className,
  isPanelVariant,
  ...rest
}: CopyProps) {
  const [copied, setCopied] = useState(false);
  /**
   * `CopyButton` controls `tooltipOpen` state because when `copied` state
   * changes, it causes the tooltip to re-render
   */
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useDarkMode();
  const { isLoading } = useLocalContext();

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

  /**
   * `handleKeyDown` listener used to maintain UX parity with mouse events
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
        handleClick(e as any);
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
      showPanel: isPanelVariant ?? false,
      className,
    }),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: buttonRef,
    disabled: isLoading,
    ...rest,
  } as const;

  return (
    <Tooltip
      align={Align.Top}
      justify={Justify.Middle}
      open={tooltipOpen}
      renderMode={RenderMode.TopLayer}
      setOpen={setTooltipOpen}
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
      shouldClose={shouldClose}
    >
      {copied ? COPIED_TEXT : COPY_TEXT}
    </Tooltip>
  );
}

CopyButton.displayName = 'CopyButton';

export default CopyButton;
