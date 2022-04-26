import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx, css } from '@leafygreen-ui/emotion';
import { palette, uiColors } from '@leafygreen-ui/palette';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import { Mode } from './types';
import { usePopoverPortalContainer } from '@leafygreen-ui/leafygreen-provider';

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

function getCopyButtonStyle(mode: Mode): string {
  const baseStyle = css`
    align-self: center;
    color: ${palette.gray.base};
  `;

  // TODO: Refresh - Update these styles
  const darkModeStyles = css`
    color: ${uiColors.gray.light2};

    &:hover {
      color: ${uiColors.gray.light3};

      &:before {
        background-color: ${uiColors.gray.dark3};
      }
    }
  `;

  return cx(baseStyle, {
    [darkModeStyles]: mode === Mode.Dark,
  });
}

interface CopyProps {
  onCopy?: Function;
  contents: string;
  darkMode?: boolean;
  withLanguageSwitcher?: boolean;
}

function CopyButton({ onCopy, contents, darkMode }: CopyProps) {
  const [copied, setCopied] = useState(false);
  const [buttonNode, setButtonNode] = useState(null);
  const mode = darkMode ? Mode.Dark : Mode.Light;

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
      className={cx(getCopyButtonStyle(mode), {
        [copiedStyle]: copied,
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
