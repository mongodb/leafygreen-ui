import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ClipboardJS from 'clipboard';
import { transparentize } from 'polished';

import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import CopyIcon from '@leafygreen-ui/icon/dist/Copy';
import { uiColors } from '@leafygreen-ui/palette';
import Tooltip, {
  Align,
  Justify,
  TriggerEvent,
  Variant as TooltipVariant,
} from '@leafygreen-ui/tooltip';
import { InlineCode } from '@leafygreen-ui/typography';

export const Variant = {
  Default: 'default',
  Dark: 'dark',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

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

const colorSets: Record<Variant, ColorSet> = {
  [Variant.Default]: {
    label: uiColors.gray.dark3,
    description: uiColors.gray.dark1,
    code: {
      text: uiColors.gray.dark3,
      background: uiColors.gray.light3,
      border: uiColors.gray.light2,
    },
  },
  [Variant.Dark]: {
    label: uiColors.gray.light1,
    description: uiColors.gray.light1,
    code: {
      text: uiColors.white,
      background: uiColors.black,
      border: uiColors.black,
    },
  },
};

const labelStyle = css`
  font-size: 14px;
  font-weight: bold;
  line-height: 20px;
`;

const descriptionStyle = css`
  color: ${uiColors.gray.dark1};
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 6px;
`;

const containerStyle = css`
  position: relative;
  height: 48px;
  width: 400px;
  margin: 1px 0;
  overflow: hidden;
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
`;

const largeCodeStyle = css`
  font-size: 16px;
`;

const buttonWrapperStyle = css`
  position: absolute;
  z-index: 1;
  right: 0;
  top: 0;
  height: 100%;
`;

const buttonStyle = css`
  height: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  filter: drop-shadow(2px 0 6px ${transparentize(0.7, uiColors.gray.dark1)});
`;

const iconStyle = css`
  padding-right: 6px;
`;

interface CopyableProps {
  variant?: Variant;
  children: string;
  label: string;
  description?: string;
  copyable?: boolean;
  size?: Size;
}

export default function Copyable({
  variant = Variant.Default,
  children,
  label,
  description,
  copyable = true,
  size = Size.Default,
}: CopyableProps) {
  const colorSet = colorSets[variant];

  const [copied, setCopied] = useState(false);
  const [showCopyButton, setShowCopyButton] = useState(false);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement>();

  useEffect(() => {
    setShowCopyButton(copyable && ClipboardJS.isSupported());
  }, [copyable]);

  let copyButton: JSX.Element | undefined;

  if (showCopyButton) {
    let buttonVariant: ButtonVariant;

    switch (variant) {
      case Variant.Default:
        buttonVariant = ButtonVariant.Default;
        break;
      case Variant.Dark:
        buttonVariant = ButtonVariant.Dark;
        break;
    }

    const trigger = (
      <Button
        ref={setButtonRef}
        variant={buttonVariant}
        className={buttonStyle}
        onClick={() => setCopied(true)}
      >
        <CopyIcon size="large" className={iconStyle} />
        Copy
      </Button>
    );

    let tooltipVariant: TooltipVariant;

    switch (variant) {
      case Variant.Default:
        tooltipVariant = TooltipVariant.Dark;
        break;
      case Variant.Dark:
        tooltipVariant = TooltipVariant.Light;
        break;
    }

    copyButton = (
      // `Tooltip` forces its trigger to be `position: relative` :/
      <div className={buttonWrapperStyle}>
        <Tooltip
          open={copied}
          variant={tooltipVariant}
          align={Align.Top}
          justify={Justify.Middle}
          trigger={trigger}
          triggerEvent={TriggerEvent.Click}
        >
          Copied!
        </Tooltip>
      </div>
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
      let destroyed = false;

      const timeoutId = setTimeout(() => {
        setCopied(false);
        clipboard.destroy();
        destroyed = true;
      }, 1500);

      return () => {
        clearTimeout(timeoutId);
        if (!destroyed) {
          clipboard.destroy();
        }
      };
    }
  }, [buttonRef, children, copied]);

  return (
    <>
      {label && (
        <div className={cx(labelStyle, css(`color: ${colorSet.label};`))}>
          {label}
        </div>
      )}
      {description && (
        <div
          className={cx(
            descriptionStyle,
            css(`color: ${colorSet.description};`),
          )}
        >
          {description}
        </div>
      )}

      <div
        className={cx(containerStyle, {
          [copyableContainerStyle]: showCopyButton,
        })}
      >
        <InlineCode
          className={cx(
            codeStyle,
            css(`
              color: ${colorSet.code.text};
              background-color: ${colorSet.code.background};
              border-color: ${colorSet.code.border};
            `),
            { [largeCodeStyle]: size === Size.Large },
          )}
        >
          {children}
        </InlineCode>
        {copyButton}
      </div>
    </>
  );
}

Copyable.displayName = 'Copyable';

Copyable.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  size: PropTypes.oneOf(Object.values(Size)),
  children: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string,
  copyable: PropTypes.bool,
};
