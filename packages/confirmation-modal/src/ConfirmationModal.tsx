import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import Modal, { Footer } from '@leafygreen-ui/modal';
import { uiColors, palette } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { fontFamilies } from '@leafygreen-ui/tokens';

const Mode = {
  Dark: 'dark',
  Light: 'light',
};

type Mode = typeof Mode[keyof typeof Mode];

export const Variant = {
  Default: ButtonVariant.Primary,
  Danger: ButtonVariant.Danger,
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const titleStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    margin-bottom: 10px;
    margin-top: 0;
  `,
  [Mode.Dark]: css`
    font-size: 24px;
    font-weight: bold;
    line-height: 25px;
    margin-bottom: 10px;
  `,
};

const titleColors: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.gray.light2};
  `,
};

const baseModalStyle = css`
  width: 600px;
  padding: initial;
  letter-spacing: 0;
`;

// TODO: Refresh – remove mode logic
const contentStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    font-family: ${fontFamilies.default};
    font-size: 13px;
    line-height: 20px;
  `,
  [Mode.Dark]: css`
    font-family: ${fontFamilies.legacy};
    font-size: 14px;
    line-height: 20px;
    padding: 36px;
  `,
};

// TODO: Refresh – remove mode logic
const modeAndVariantContentStyles: Record<Mode, Record<Variant, string>> = {
  [Mode.Light]: {
    [Variant.Default]: css`
      padding: 40px 36px 0px;
    `,
    [Variant.Danger]: css`
      padding: 40px 36px 0px 78px;
    `,
  },
  [Mode.Dark]: {
    [Variant.Default]: css``,
    [Variant.Danger]: css``,
  },
};

const contentColors = {
  [Mode.Light]: css`
    color: ${palette.black};
  `,
  [Mode.Dark]: css`
    color: ${uiColors.white};
  `,
};

const textEntryInputStyle = css`
  width: 300px;
  margin-top: 14px;
`;

// TODO: Refresh - remove mode logic
const buttonStyle = {
  [Mode.Light]: css`
    margin: 0 2px;

    &:first-of-type {
      margin: 0 0 0 5px;
    }

    &:last-of-type {
      margin: 0 5px 0 0;
    }
  `,
  [Mode.Dark]: css`
    margin: 0 2px;

    &:first-of-type {
      margin: 0 0 0 4px;
    }

    &:last-of-type {
      margin: 0 4px 0 0;
    }
  `,
};

const warningIconStyles = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${palette.red.light3};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 36px;
  top: 40px;

  svg {
    margin-top: -3px;
  }
`;

interface ConfirmationModalProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  className?: string;
  buttonText: string;
  variant?: Variant;
  requiredInputText?: string;
  submitDisabled?: boolean;
  darkMode?: boolean;
}

const ConfirmationModal = ({
  children,
  title,
  requiredInputText,
  buttonText,
  submitDisabled = false,
  variant = Variant.Default,
  onConfirm,
  onCancel,
  darkMode,
  ...modalProps
}: ConfirmationModalProps) => {
  const [confirmEnabled, setConfirmEnabled] = useState(!requiredInputText);
  const mode = darkMode ? Mode.Dark : Mode.Light;

  const textEntryConfirmation = useMemo(() => {
    setConfirmEnabled(!requiredInputText);

    let textEntryConfirmation = null;

    if (requiredInputText) {
      const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmEnabled(event.target.value === requiredInputText);
      };
      textEntryConfirmation = (
        <TextInput
          label={`Type "${requiredInputText}" to confirm your action`}
          className={textEntryInputStyle}
          onChange={onInputChange}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          darkMode={darkMode}
        ></TextInput>
      );
    }

    return textEntryConfirmation;
  }, [requiredInputText, darkMode]);

  return (
    <Modal
      {...modalProps}
      contentClassName={baseModalStyle}
      setOpen={onCancel}
      darkMode={darkMode}
    >
      <div
        className={cx(
          contentStyle[mode],
          contentColors[mode],
          modeAndVariantContentStyles[mode][variant],
        )}
      >
        {/* TODO: Refresh - remove mode logic when darkmode is updated */}
        {variant === Variant.Danger && mode === Mode.Light && (
          <div className={cx(warningIconStyles)}>
            <WarningIcon fill={palette.red.base} role="presentation" />
          </div>
        )}
        <h1 className={cx(titleStyle[mode], titleColors[mode])}>{title}</h1>
        {children}
        {textEntryConfirmation}
      </div>
      <Footer darkMode={darkMode}>
        <Button
          variant={variant}
          disabled={!confirmEnabled || submitDisabled}
          onClick={onConfirm}
          className={buttonStyle[mode]}
          darkMode={darkMode}
        >
          {buttonText}
        </Button>
        <Button
          onClick={onCancel}
          className={buttonStyle[mode]}
          darkMode={darkMode}
        >
          Cancel
        </Button>
      </Footer>
    </Modal>
  );
};

ConfirmationModal.displayName = 'ConfirmationModal';

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)),
  requiredInputText: PropTypes.string,
};

export default ConfirmationModal;
