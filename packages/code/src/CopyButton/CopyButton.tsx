import React, { useEffect, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import { useBackdropClick } from '@leafygreen-ui/hooks';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';
import { keyMap } from '@leafygreen-ui/lib';
import Tooltip, { Align, Justify } from '@leafygreen-ui/tooltip';

import { COPIED_SUCCESS_DURATION, COPIED_TEXT, COPY_TEXT } from './constants';
import { copiedThemeStyle, copyButtonThemeStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';

function CopyButton({ onCopy, contents }: CopyProps) {
  const [copied, setCopied] = useState(false);
  /**
   * `CopyButton` controls `open` state of tooltip because when `copied` state
   * changes, it causes the tooltip to re-render
   */
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useDarkMode();
  const { portalContainer } = usePopoverPortalContainer();

  /**
   * toggles `open` state of tooltip
   */
  const closeTooltip = () => setOpen(false);
  const openTooltip = () => setOpen(true);

  /**
   * forcibly closes tooltip if user tabs focus on tooltip and clicks
   * outside of the trigger
   */
  useBackdropClick(closeTooltip, buttonRef, open);

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
   * `handleMouseEnter` and `handleMouseLeave` are used to control `open`
   * state when mouse hovers over tooltip trigger
   */
  const handleMouseEnter = () => {
    openTooltip();
  };

  const handleMouseLeave = () => {
    closeTooltip();
  };

  /**
   * `shouldClose` indicates to `Tooltip` component that tooltip should
   * remain open even if trigger re-renders
   */
  const shouldClose = () => !open;

  return (
    <Tooltip
      data-testid="code_copy-button_tooltip"
      open={open}
      setOpen={setOpen}
      align={Align.Top}
      justify={Justify.Middle}
      trigger={
        <IconButton
          data-testid="code_copy-button"
          ref={buttonRef}
          aria-label={COPY_TEXT}
          className={cx(copyButtonThemeStyles[theme], {
            [copiedThemeStyle[theme]]: copied,
          })}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {copied ? <CheckmarkIcon /> : <CopyIcon />}
          {copied && (
            <VisuallyHidden role="alert">{COPIED_TEXT}</VisuallyHidden>
          )}
        </IconButton>
      }
      shouldClose={shouldClose}
    >
      {copied ? COPIED_TEXT : COPY_TEXT}
    </Tooltip>
  );
}

CopyButton.displayName = 'CopyButton';

export default CopyButton;
