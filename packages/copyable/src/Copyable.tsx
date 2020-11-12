import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { transparentize } from 'polished';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import { IdAllocator } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
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
  label: string;
  description: string;
  code: {
    text: string;
    background: string;
    border: string;
  };
}

const colorSets: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    label: uiColors.gray.dark3,
    description: uiColors.gray.dark1,
    code: {
      text: uiColors.gray.dark3,
      background: uiColors.gray.light3,
      border: uiColors.gray.light2,
    },
  },
  [Mode.Dark]: {
    label: uiColors.gray.light1,
    description: uiColors.gray.light1,
    code: {
      text: uiColors.white,
      background: uiColors.black,
      border: uiColors.black,
    },
  },
};

const containerStyle = css`
  position: relative;
  height: 48px;
  width: 400px;
  margin: 1px 0;
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
  border-radius: 4px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
`;

const largeCodeStyle = css`
  font-size: 16px;
`;

const buttonWrapperStyle = css`
  display: inline-block;
  height: 100%;
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
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
      ${transparentize(1, uiColors.gray.dark1)} 0%,
      ${transparentize(0.9, uiColors.gray.dark1)} 100%
    );
  }
`;

const buttonStyle = css`
  height: 100%;
`;

const iconStyle = css`
  padding-right: 6px;
`;

interface CopyableProps {
  darkMode?: boolean;
  children: string;
  label: string;
  description?: string;
  className?: string;
  copyable?: boolean;
  size?: Size;
}

const idAllocator = IdAllocator.create('copyable');

export default function Copyable({
  darkMode = false,
  children,
  label,
  description,
  className,
  copyable = true,
  size = Size.Default,
}: CopyableProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const colorSet = colorSets[mode];

  const [copied, setCopied] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement>();

  useEffect(() => {
    setShowCopyButton(copyable && ClipboardJS.isSupported());
  }, [copyable]);

  const codeId = React.useMemo(() => idAllocator.generate(), []);

  let copyButton: JSX.Element | undefined;

  if (showCopyButton) {
    let buttonVariant: ButtonVariant;

    switch (mode) {
      case Mode.Light:
        buttonVariant = ButtonVariant.Default;
        break;
      case Mode.Dark:
        buttonVariant = ButtonVariant.Dark;
        break;
    }

    // Forward darkMode prop for future versions of Button that support it
    const buttonRestProps: {} = { darkMode };

    const trigger = (
      <Button
        ref={setButtonRef}
        variant={buttonVariant}
        className={buttonStyle}
        borderRadius="0 4px 4px 0;"
        onClick={() => setCopied(true)}
        {...buttonRestProps}
      >
        <CopyIcon size="large" className={iconStyle} />
        Copy
      </Button>
    );

    copyButton = (
      <Tooltip
        open={copied}
        darkMode={!darkMode}
        align={Align.Top}
        justify={Justify.Middle}
        trigger={trigger}
        triggerEvent={TriggerEvent.Click}
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
      {description && <Description>{description}</Description>}

      <div
        className={cx(
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
            { [largeCodeStyle]: size === Size.Large },
            {
              [css`
                border-radius: 0 4px 4px 0;
              `]: showCopyButton,
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
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  className: PropTypes.string,
  copyable: PropTypes.bool,
};
