import React, { useEffect, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import Button from '@leafygreen-ui/button';
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

import { useCodeContext } from '../CodeContext/CodeContext';
import { LGIDS } from '../constants';

import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';
import { getCopyButtonUtilsStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';

function CopyButton({ onCopy, contents, className, ...rest }: CopyProps) {
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
  const { showPanel, isLoading } = useCodeContext();

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
    'data-testid': LGIDS.copyButton,
    'data-lgid': LGIDS.copyButton,
    className: getCopyButtonUtilsStyles({
      theme,
      copied,
      showPanel,
      className,
    }),
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ref: buttonRef,
    disabled: isLoading,
    ...rest,
  };

  return (
    <Tooltip
      align={Align.Top}
      data-testid={LGIDS.copyTooltip}
      justify={Justify.Middle}
      open={tooltipOpen}
      renderMode={RenderMode.TopLayer}
      setOpen={setTooltipOpen}
      trigger={
        showPanel ? (
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
