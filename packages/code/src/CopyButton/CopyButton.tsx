import React, { useEffect, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
// import { cx } from '@leafygreen-ui/emotion';
import { useBackdropClick } from '@leafygreen-ui/hooks';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import Tooltip, {
  Align,
  hoverDelay,
  Justify,
  RenderMode,
} from '@leafygreen-ui/tooltip';

import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';
import { getCopyButtonStyles, tooltipStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';
import { useCodeContext } from '../CodeContext/CodeContext';
import Button from '@leafygreen-ui/button';
import { LGIDs } from '../constants';

function CopyButton({ onCopy, contents }: CopyProps) {
  const [copied, setCopied] = useState(false);
  /**
   * `CopyButton` controls `tooltipOpen` state because when `copied` state
   * changes, it causes the tooltip to re-render
   */
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { theme } = useDarkMode();
  const { portalContainer } = usePopoverPortalContainer();
  const { hasPanel, isLoading } = useCodeContext();

  /**
   * toggles `tooltipOpen` state
   */
  const closeTooltip = () => setTooltipOpen(false);
  const openTooltip = () => setTooltipOpen(true);

  /**
   * forcibly closes tooltip if user tabs focus on tooltip and clicks
   * outside of the trigger
   */
  useBackdropClick(closeTooltip, buttonRef, tooltipOpen);

  useEffect(() => {
    if (!buttonRef.current) {
      return;
    }

    const clipboard = new ClipboardJS(buttonRef.current, {
      text: () => contents,
      container: portalContainer,
    });

    if (copied) {
      console.log('🤡');
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, COPIED_SUCCESS_DURATION);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [buttonRef, contents, copied, portalContainer]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCopy?.();
    setCopied(true);
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
    'data-testid': LGIDs.copyButton,
    className: getCopyButtonStyles({ theme, copied }),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: buttonRef,
    disabled: isLoading,
  };

  return (
    <Tooltip
      align={Align.Top}
      className={tooltipStyles}
      data-testid="code_copy-button_tooltip"
      justify={Justify.Middle}
      open={tooltipOpen}
      renderMode={RenderMode.TopLayer}
      setOpen={setTooltipOpen}
      trigger={
        hasPanel ? (
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
