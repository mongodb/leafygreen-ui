import React, { useEffect, useRef, useState } from 'react';
import ClipboardJS from 'clipboard';
import PropTypes from 'prop-types';

import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import Tooltip, { Align, Justify, TriggerEvent } from '@leafygreen-ui/tooltip';
import {
  Description,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';

import {
  buttonContainerStyle,
  buttonStyle,
  buttonWrapperStyle,
  buttonWrapperStyleShadow,
  buttonWrapperStyleShadowTheme,
  codeFontStyle,
  codeStyle,
  codeStyleColor,
  codeStyleNoButton,
  containerStyle,
  iconStyle,
  labelFontStyle,
  labelNoButtonStyle,
  noButtonContainerStyle,
  noButtonContainerStyleMode,
} from './Copyable.styles';
import { CopyableProps, Size } from './Copyable.types';

export default function Copyable({
  children,
  className,
  copyable = true,
  darkMode: darkModeProp,
  description,
  label,
  onCopy,
  shouldTooltipUsePortal = true,
  size: SizeProp,
}: CopyableProps) {
  const { theme, darkMode } = useDarkMode(darkModeProp);
  const [copied, setCopied] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement>();
  const codeRef = useRef<HTMLElement>(null);

  const { portalContainer } = usePopoverPortalContainer();

  const baseFontSize = useUpdatedBaseFontSize();

  // If there is a size use that Size, if not then use the baseFontSize to set the size
  const size = SizeProp
    ? SizeProp
    : baseFontSize === BaseFontSize.Body1
    ? Size.Default
    : Size.Large;

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
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [buttonRef, children, copied, portalContainer]);

  return (
    <>
      {label && (
        <Label
          darkMode={darkMode}
          htmlFor={codeId}
          className={cx(labelFontStyle[size], {
            [labelNoButtonStyle]: !showCopyButton,
          })}
        >
          {label}
        </Label>
      )}
      {description && (
        <Description
          darkMode={darkMode}
          className={cx(labelFontStyle[size], {
            [labelNoButtonStyle]: !showCopyButton,
          })}
        >
          {description}
        </Description>
      )}

      <div
        className={cx(
          containerStyle,
          {
            [buttonContainerStyle]: showCopyButton,
            [noButtonContainerStyleMode[theme]]: !showCopyButton,
            [noButtonContainerStyle]: !showCopyButton,
          },
          className,
        )}
      >
        <code
          id={codeId}
          ref={codeRef}
          className={cx(
            codeStyle,
            codeStyleColor[theme],
            [codeFontStyle[size]],
            {
              [codeStyleNoButton]: !showCopyButton,
            },
          )}
        >
          {children}
        </code>
        {/* Using span because adding shadows directly to the button blends together with the hover box-shadow */}
        <span
          className={cx(buttonWrapperStyle, {
            // Toggle these styles on only when the content extends beyond the edge of the container
            [buttonWrapperStyleShadow]: isOverflowed,
            [buttonWrapperStyleShadowTheme[theme]]: isOverflowed,
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
              usePortal={shouldTooltipUsePortal}
            >
              Copied!
            </Tooltip>
          )}
        </span>
      </div>
    </>
  );
}

Copyable.displayName = 'Copyable';

Copyable.propTypes = {
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  children: PropTypes.string.isRequired,
  label: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
  copyable: PropTypes.bool,
  shouldTooltipUsePortal: PropTypes.bool,
};
