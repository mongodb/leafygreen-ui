import React, { useEffect, useState } from 'react';
import ClipboardJS from 'clipboard';

import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button/dist/IconButton/index';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';

import { copiedThemeStyle, copyButtonThemeStyles } from './CopyButton.styles';
import { CopyProps } from './CopyButton.types';

function CopyButton({ onCopy, contents }: CopyProps) {
  const [copied, setCopied] = useState(false);
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

  return (
    <IconButton
      ref={setButtonNode}
      darkMode={darkMode}
      aria-label="Copy"
      className={cx(copyButtonThemeStyles[theme], {
        [copiedThemeStyle[theme]]: copied,
      })}
      onClick={handleClick}
    >
      {copied ? <CheckmarkIcon /> : <CopyIcon />}
      {copied && <VisuallyHidden role="alert">Copied!</VisuallyHidden>}
    </IconButton>
  );
}

CopyButton.displayName = 'CopyButton';

export default CopyButton;
