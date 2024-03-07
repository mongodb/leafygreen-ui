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

import { copiedThemeStyle, copyButtonThemeStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';

const COPY_TEXT = 'Copy';
const COPIED_TEXT = 'Copied!';

function CopyButton({ onCopy, contents }: CopyProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { theme } = useDarkMode();
  const { portalContainer } = usePopoverPortalContainer();

  const closeTooltip = () => setOpen(false);
  const openTooltip = () => setOpen(true);

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
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [buttonRef, contents, copied, portalContainer]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onCopy?.();
    setCopied(true);
  };

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

  const handleMouseEnter = () => {
    openTooltip();
  };

  const handleMouseLeave = () => {
    closeTooltip();
  };

  const shouldClose = () => !open;

  return (
    <Tooltip
      open={open}
      setOpen={setOpen}
      align={Align.Top}
      justify={Justify.Middle}
      trigger={
        <IconButton
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
