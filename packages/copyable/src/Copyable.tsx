import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { transparentize } from 'polished';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { palette } from '@leafygreen-ui/palette';
import Tooltip, { Align, Justify, TriggerEvent } from '@leafygreen-ui/tooltip';
import {
  Description,
  InlineCode,
  Label,
  useUpdatedBaseFontSize,
  labelTypeScaleStyles,
} from '@leafygreen-ui/typography';
import {
  useDarkMode,
  usePopoverPortalContainer,
} from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize, typeScales } from '@leafygreen-ui/tokens';
import { HTMLElementProps, Theme } from '@leafygreen-ui/lib';

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

const codeStyleColor: Record<Theme, string> = {
  [Theme.Light]: css`
    color: ${palette.black};
  `,
  [Theme.Dark]: css`
    color: ${palette.gray.light2};
    border-color: ${palette.gray.dark1};
  `,
};

const containerStyle = css`
  position: relative;
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 1fr auto;
  height: 48px;
  width: 400px;
  margin: 2px 0;
`;

const buttonContainerStyle = css`
  height: 36px;
`;

const codeStyle = css`
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-left: 12px;
  border-radius: 6px;
  white-space: nowrap;
  overflow: auto;
  grid-column: 1/-1;
  grid-row: 1/2;
`;

// Border is removed from the code component and added to the parent
const codeStyleNoButton = css`
  border: 0;
`;

const labelNoButtonStyle = css`
  font-size: 18px;
  line-height: 24px;
`;

const codeFontStyle: Record<Size, string> = {
  [Size.Default]: css`
    font-size: ${typeScales.code1.fontSize}px;
    line-height: ${typeScales.code1.lineHeight}px;
  `,
  [Size.Large]: css`
    font-size: ${typeScales.code2.fontSize}px;
    line-height: ${typeScales.code2.lineHeight}px;
  `,
};

const labelFontStyle: Record<Size, string> = {
  [Size.Default]: labelTypeScaleStyles[BaseFontSize.Body1],
  [Size.Large]: labelTypeScaleStyles[BaseFontSize.Body2],
};

const noButtonContainerStyle = css`
  overflow: hidden;
  border-radius: 12px;
`;

// When there is no button, remove the border from the code component and add the border to this component so it sits above the button wrapper box shadow
const noButtonContainerStyleMode: Record<Theme, string> = {
  [Theme.Light]: css`
    border-radius: 6px;
    border: 1px solid ${palette.gray.light2};
  `,
  [Theme.Dark]: css`
    border-radius: 6px;
    border: 1px solid ${palette.gray.dark1};
  `,
};

const buttonWrapperStyle = css`
  position: relative;
  display: inline-block;
  height: 100%;
  grid-column: 2/-1;
  grid-row: 1/2;
`;

const buttonWrapperStyleShadow = css`
  &:before {
    content: '';
    display: block;
    position: absolute;
    height: calc(100% - 6px);
    width: 16px;
    left: 0px;
    top: 3px;
    border-radius: 100%;
    transition: box-shadow 100ms ease-in-out;
  }
`;

const buttonWrapperStyleShadowTheme: Record<Theme, string> = {
  [Theme.Light]: css`
    &:before {
      box-shadow: 0 0 10px 0 ${transparentize(0.65, palette.gray.dark1)};
    }

    &:hover:before {
      box-shadow: 0 0 12px 0 ${transparentize(0.6, palette.gray.dark1)};
    }
  `,
  [Theme.Dark]: css`
    &:before {
      box-shadow: -10px 0 10px 0 ${transparentize(0.4, palette.black)};
    }

    &:hover:before {
      box-shadow: -12px 0 10px 0 ${transparentize(0.4, palette.black)};
    }
  `,
};
const buttonStyle = css`
  height: 100%;
  border-radius: 0 6px 6px 0;

  // The ripple element
  & > :first-child {
    border-radius: 0 6px 6px 0;
  }
`;

const iconStyle = css`
  padding-right: 6px;
`;

interface CopyableProps extends HTMLElementProps<'div'> {
  /**
   * Determines whether or not the component appears in dark theme.
   * @default false
   */
  darkMode?: boolean;
  children: string;
  /**
   * Label text
   */
  label?: string;
  /**
   * Description text
   */
  description?: string;

  /**
   * If `true`, there will be a copy button that will move the component's children to the user's clipboard
   */
  copyable?: boolean;
  /**
   * The display size of the label, description, and copyable children
   */
  size?: Size;
  /**
   * If `true`, the tooltip rendered as feedback when the user clicks the copy button will be rendered using a portal
   */
  shouldTooltipUsePortal?: boolean;
}

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

  let copyButton: JSX.Element | undefined;

  if (showCopyButton) {
    const trigger = (
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
    );

    copyButton = (
      <Tooltip
        open={copied}
        darkMode={darkMode}
        align={Align.Top}
        justify={Justify.Middle}
        trigger={trigger}
        triggerEvent={TriggerEvent.Click}
        usePortal={shouldTooltipUsePortal}
      >
        Copied!
      </Tooltip>
    );
  }

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
        <InlineCode
          darkMode={darkMode}
          id={codeId}
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
        </InlineCode>
        {/* Using span because adding shadows directly to the button blends together with the hover box-shadow */}
        <span
          className={cx(buttonWrapperStyle, {
            // TODO: Toggle these styles on only when the content extends beyond the edge of the container
            [buttonWrapperStyleShadow]: true,
            [buttonWrapperStyleShadowTheme[theme]]: true,
          })}
        >
          {copyButton}
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
