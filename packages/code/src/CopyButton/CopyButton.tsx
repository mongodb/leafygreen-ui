import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';
import Tooltip, { Align, Justify } from '@leafygreen-ui/tooltip';

import { copiedThemeStyle, copyButtonThemeStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';

const COPY_TEXT = 'Copy';
const COPIED_TEXT = 'Copied!';

function CopyButton({ onCopy, contents }: CopyProps) {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [buttonNode, setButtonNode] = useState(null);
  const { theme, darkMode } = useDarkMode();
  const { portalContainer } = usePopoverPortalContainer();

  useEffect(() => {
    if (!buttonNode) {
      return;
    }

    const clipboard = new ClipboardJS(buttonNode, {
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
  }, [buttonNode, contents, copied, portalContainer]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (onCopy) {
      onCopy();
    }

    setCopied(true);
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const shouldClose = () => !hovered;

  return (
    <Tooltip
      open={hovered}
      setOpen={setHovered}
      darkMode={darkMode}
      align={Align.Top}
      justify={Justify.Middle}
      trigger={
        <IconButton
          ref={setButtonNode}
          darkMode={darkMode}
          aria-label={COPY_TEXT}
          className={cx(copyButtonThemeStyles[theme], {
            [copiedThemeStyle[theme]]: copied,
          })}
          onClick={handleClick}
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
