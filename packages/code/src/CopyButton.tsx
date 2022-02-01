import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx, css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import { Mode } from './types';

function getCopyButtonStyle(mode: Mode, copied: boolean): string {
  const baseStyle = css`
    align-self: center;
    color: ${palette.gray.base};
  `;

  const copiedStyle = css`
    color: ${palette.white};
    background-color: ${palette.green.dark1};

    &:focus {
      color: ${palette.white};

      &:before {
        background-color: ${palette.green.dark1};
      }
    }

    &:hover {
      color: ${palette.white};

      &:before {
        background-color: ${palette.green.dark1};
      }
    }
  `;

  return cx(baseStyle, {
    [copiedStyle]: copied,
  });
}

interface CopyProps {
  onCopy?: Function;
  contents: string;
  darkMode?: boolean;
  withLanguageSwitcher?: boolean;
}

function CopyButton({
  onCopy,
  contents,
  darkMode,
  withLanguageSwitcher = false,
}: CopyProps) {
  const [copied, setCopied] = useState(false);
  const [buttonNode, setButtonNode] = useState(null);
  const mode = darkMode ? Mode.Dark : Mode.Light;

  useEffect(() => {
    if (!buttonNode) {
      return;
    }

    const clipboard = new ClipboardJS(buttonNode, {
      text: () => contents,
    });

    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [buttonNode, contents, copied]);

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
      className={getCopyButtonStyle(mode, copied)}
      onClick={handleClick}
    >
      {copied ? <CheckmarkIcon /> : <CopyIcon />}
      {copied && <VisuallyHidden role="alert">Copied!</VisuallyHidden>}
    </IconButton>
  );
}

CopyButton.displayName = 'CopyButton';

export default CopyButton;
