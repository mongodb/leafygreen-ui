import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { transparentize } from 'polished';
import Button from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import { palette, uiColors } from '@leafygreen-ui/palette';
import Tooltip, { Align, Justify, TriggerEvent } from '@leafygreen-ui/tooltip';
import { Description, InlineCode, Label } from '@leafygreen-ui/typography';
import { usePopoverPortalContainer } from '@leafygreen-ui/leafygreen-provider';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export const Size = {
  Default: 'default',
  Large: 'large',
} as const;

export type Size = typeof Size[keyof typeof Size];

interface ColorSet {
  code: {
    text: string;
    background: string;
    border: string;
  };
}

const colorSets: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    code: {
      text: palette.gray.dark3,
      background: palette.gray.light3,
      border: palette.gray.light2,
    },
  },
  [Mode.Dark]: {
    code: {
      text: uiColors.white,
      background: uiColors.black,
      border: uiColors.black,
    },
  },
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

const copyableContainerStyle = css`
  height: 36px;
`;

const codeStyle = css`
  display: inline-flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding-left: 12px;
  // border: 1px solid;
  border-radius: 6px;
  white-space: nowrap;
  overflow: hidden;
  grid-column: 1/-1;
  grid-row: 1/2;
`;

const largeCodeStyle = css`
  font-size: 15px;
  line-height: 24px;
`;

const noButtonCodeStyle = css`
  overflow: hidden;
`;

const codeStyleColor = (mode: Mode) => css`
  // color: ${colorSets[mode].code.text};
  // background-color: ${colorSets[mode].code.background};
  // border-color: ${colorSets[mode].code.border};
`;

const buttonWrapperStyle = css`
  position: relative;
  display: inline-block;
  height: 100%;
  grid-column: 2/-1;
  grid-row: 1/2;
`;

const copyableButtonShadowStyle = css`
  &:before {
    content: '';
    display: block;
    position: absolute;
    height: calc(100% - 6px);
    width: 16px;
    left: 0px;
    top: 3px;
    border-radius: 100%;
    box-shadow: 0 0 10px 0 ${transparentize(0.65, palette.gray.dark1)};
    transition: box-shadow 100ms ease-in-out;
  }

  &:hover:before {
    box-shadow: 0 0 12px 0 ${transparentize(0.6, palette.gray.dark1)};
  }
`;

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

interface CopyableProps {
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
  className?: string;
  /**
   * If `true`, there will be a copy button that will move the component's children to the user's clipboard
   */
  copyable?: boolean;
  /**
   * The font size of the component's copyable children
   */
  size?: Size;
  /**
   * If `true`, the tooltip rendered as feedback when the user clicks the copy button will be rendered using a portal
   */
  shouldTooltipUsePortal?: boolean;
}

export default function Copyable({
  darkMode = false,
  children,
  label,
  description,
  className,
  copyable = true,
  size = Size.Default,
  shouldTooltipUsePortal = true,
}: CopyableProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const [copied, setCopied] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement>();

  const { portalContainer } = usePopoverPortalContainer();

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
        <Label darkMode={darkMode} htmlFor={codeId}>
          {label}
        </Label>
      )}
      {description && (
        <Description darkMode={darkMode}>{description}</Description>
      )}

      <div
        className={cx(
          containerStyle,
          {
            [copyableContainerStyle]: showCopyButton,
            [noButtonCodeStyle]: !showCopyButton,
          },
          className,
        )}
      >
        <InlineCode
          darkMode={darkMode}
          id={codeId}
          className={cx(codeStyle, codeStyleColor(mode), {
            [largeCodeStyle]: size === Size.Large,
          })}
        >
          {children}
        </InlineCode>
        <span
          className={cx(buttonWrapperStyle, {
            // TODO: Toggle these styles on only when the content extends beyond the edge of the container
            [copyableButtonShadowStyle]: true,
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
