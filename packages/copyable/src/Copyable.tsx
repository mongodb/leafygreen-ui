import React, { useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import Button from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import Tooltip, { Align, Justify, TriggerEvent } from '@leafygreen-ui/tooltip';
import {
  Description,
  InlineCode,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { CopyableProps, Size } from './types';
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
} from './styles';

export default function Copyable({
  darkMode: darkModeProp,
  children,
  label,
  description,
  className,
  copyable = true,
  size: SizeProp,
  shouldTooltipUsePortal = true,
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
                  onClick={() => setCopied(true)}
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
