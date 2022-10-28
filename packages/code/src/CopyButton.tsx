import React, { useState, useEffect } from 'react';
import ClipboardJS from 'clipboard';
import { VisuallyHidden } from '@leafygreen-ui/a11y';
import { cx, css } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import IconButton from '@leafygreen-ui/icon-button';
import { usePopoverPortalContainer } from '@leafygreen-ui/leafygreen-provider';
import { Theme } from '@leafygreen-ui/lib';
import { useCodeContext } from './CodeContext';

const copiedThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.white};
    background-color: ${palette.green.dark1};

    &:focus,
    &:hover {
      color: ${palette.white};

      &:before {
        background-color: ${palette.green.dark1};
      }
    }
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.dark3};
    background-color: ${palette.green.dark1};

    &:focus,
    &:hover {
      color: ${palette.gray.dark3};

      &:before {
        background-color: ${palette.green.dark1};
      }
    }
  `,
};

const copyButtonThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css`
    align-self: center;
    color: ${palette.gray.base};
  `,
  [Theme.Dark]: css`
    align-self: center;
    color: ${palette.gray.light1};
  `,
};

interface CopyProps {
  onCopy?: Function;
  contents: string;
  withLanguageSwitcher?: boolean;
}

function CopyButton({ onCopy, contents }: CopyProps) {
  const [copied, setCopied] = useState(false);
  const [buttonNode, setButtonNode] = useState(null);
  const { theme, darkMode } = useCodeContext();

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
