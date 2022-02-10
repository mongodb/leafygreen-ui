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
  border: 1px solid;
  border-radius: 6px;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  grid-column: 1/-1;
  grid-row: 1/2;
`;

const largeCodeStyle = css`
  font-size: 15px;
`;

const buttonWrapperStyle = css`
  position: relative;
  display: inline-block;
  height: 100%;
  grid-column: 2/-1;
  grid-row: 1/2;
`;

const copyableButtonWrapperStyle = css`
  // Pseudo-element that gives the illusion of the button casting a shadow
  // that doesn't overflow the container. We can't set "overflow: hidden" on
  // on the container because the interaction rings of the button need to be
  // able to overflow.
  &:before {
    content: '';
    display: inline-block;
    position: absolute;
    height: calc(100% - 2px);
    width: 8px;
    left: -8px;
    top: 1px;

    background: linear-gradient(
      to right,
      ${transparentize(1, palette.gray.dark1)} 0%,
      ${transparentize(0.9, palette.gray.dark1)} 100%
    );
  }
`;

const buttonStyle = css`
  height: 100%;
  border-radius: 0 6px 6px 0;
`;

const iconStyle = css`
  padding-right: 6px;
`;

interface CopyableProps {
  darkMode?: boolean;
  children: string;
  label?: string;
  description?: string;
  className?: string;
  copyable?: boolean;
  size?: Size;
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
  const colorSet = colorSets[mode];

  const [copied, setCopied] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement>();

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
    });

    if (copied) {
      const timeoutId = setTimeout(() => {
        setCopied(false);
      }, 1500);

      return () => clearTimeout(timeoutId);
    }

    return () => clipboard.destroy();
  }, [buttonRef, children, copied]);

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
          'container',
          containerStyle,
          {
            [copyableContainerStyle]: showCopyButton,
          },
          className,
        )}
      >
        <InlineCode
          id={codeId}
          className={cx(
            codeStyle,
            css`
              color: ${colorSet.code.text};
              background-color: ${colorSet.code.background};
              border-color: ${colorSet.code.border};
            `,
            {
              [largeCodeStyle]: size === Size.Large,
              // TODO: Refresh - remove dark mode logic
              [css`
                font-size: 14px;
              `]: darkMode,
              [css`
                font-size: 16px;
              `]: darkMode && size === Size.Large,
            },
          )}
        >
          {children}
        </InlineCode>
        <span
          className={cx(buttonWrapperStyle, {
            [copyableButtonWrapperStyle]: showCopyButton,
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
};
