import React, { useEffect, useMemo, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';

import { Button } from '@leafygreen-ui/button';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import {
  Align,
  Justify,
  RenderMode,
  Tooltip,
  TriggerEvent,
} from '@leafygreen-ui/tooltip';
import {
  Description,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import { TOOLTIP_VISIBLE_DURATION } from './constants';
import {
  buttonStyle,
  getButtonWrapperStyle,
  getCodeStyle,
  getContainerStyle,
  getFontStyle,
  iconStyle,
} from './Copyable.styles';
import { CopyableProps, Size } from './Copyable.types';

/**
 * Copyable components provide users with an easy way to quickly copy code.
 */
export default function Copyable({
  children,
  className,
  copyable = true,
  darkMode: darkModeProp,
  description,
  label,
  onCopy,
  size: SizeProp,
  wrapperClassName,
}: CopyableProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const [copied, setCopied] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const codeRef = useRef<HTMLElement | null>(null);

  const { portalContainer } = usePopoverPortalContainer();

  const baseFontSize = useUpdatedBaseFontSize();

  // If there is a size use that Size, if not then use the baseFontSize to set the size
  const size = useMemo(() => {
    if (SizeProp) return SizeProp;

    if (baseFontSize === BaseFontSize.Body1) {
      return Size.Default;
    } else {
      return Size.Large;
    }
  }, [SizeProp, baseFontSize]);

  useEffect(() => {
    setShowCopyButton(copyable && ClipboardJS.isSupported());
  }, [copyable]);

  const codeId = useIdAllocator({ prefix: 'code' });

  const isOverflowed = codeRef.current
    ? codeRef.current?.scrollWidth > codeRef.current?.clientWidth
    : false;

  // Clipboard functionality
  useEffect(() => {
    if (!buttonRef) {
      return;
    }

    const clipboard = new ClipboardJS(buttonRef, {
      text: () => children,
      container: portalContainer,
    });

    clipboard.on('success', (event: React.ClipboardEvent<HTMLDivElement>) => {
      onCopy?.(event);
    });

    clipboard.on('error', (event: React.ClipboardEvent<HTMLDivElement>) => {
      onCopy?.(event);
    });

    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, TOOLTIP_VISIBLE_DURATION);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [buttonRef, children, copied, onCopy, portalContainer]);

  return (
    <div className={wrapperClassName}>
      {label && (
        <Label
          darkMode={darkMode}
          htmlFor={codeId}
          className={getFontStyle({
            size,
            showCopyButton,
          })}
        >
          {label}
        </Label>
      )}
      {description && (
        <Description
          darkMode={darkMode}
          className={getFontStyle({
            size,
            showCopyButton,
          })}
        >
          {description}
        </Description>
      )}

      <div
        className={getContainerStyle({
          showCopyButton,
          theme,
          className,
        })}
      >
        <code
          id={codeId}
          ref={codeRef}
          className={getCodeStyle({
            theme,
            size,
            showCopyButton,
          })}
        >
          {children}
        </code>
        {/* Using span because adding shadows directly to the button blends together with the hover box-shadow */}
        <span
          className={getButtonWrapperStyle({
            theme,
            isOverflowed,
          })}
        >
          {showCopyButton && (
            <Tooltip
              open={copied}
              darkMode={darkMode}
              align={Align.Top}
              justify={Justify.Middle}
              trigger={
                <Button
                  ref={setButtonRef}
                  variant="default"
                  darkMode={darkMode}
                  className={buttonStyle}
                  onClick={() => {
                    setCopied(true);
                  }}
                  leftGlyph={<CopyIcon size="large" className={iconStyle} />}
                >
                  Copy
                </Button>
              }
              triggerEvent={TriggerEvent.Click}
              renderMode={RenderMode.TopLayer}
            >
              Copied!
            </Tooltip>
          )}
        </span>
      </div>
    </div>
  );
}

Copyable.displayName = 'Copyable';
