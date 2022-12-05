import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import { css, cx } from '@leafygreen-ui/emotion';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import Modal, { Footer, ModalProps } from '@leafygreen-ui/modal';
import { palette, uiColors } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';
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

const titleStyle = css`
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-bottom: 10px;
  margin-top: 0;
  color: ${palette.black};
`;

const baseModalStyle = css`
  width: 600px;
  padding: initial;
  letter-spacing: 0;
`;

const contentStyle = css`
  font-family: ${fontFamilies.default};
  font-size: 13px;
  line-height: 20px;
  color: ${palette.black};
`;

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

const textEntryInputStyle = css`
  width: 300px;
  margin-top: 14px;

  label {
    margin-bottom: 3px;
  }
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

interface ConfirmationModalProps extends ModalProps {
  /**
   * Text of header element
   */
  title: string;

  /**
   * The component is shown when the value is set to `true`.
   */
  open?: boolean;
  /**
   * Callback fired when the primary action button is clicked.
   */
  onConfirm?: () => void;
  /**
   * Callback fired when the cancel button is clicked.
   */
  onCancel?: () => void;
  className?: string;
  /**
   * Text rendered in the primary button. Defaults to `"Confirm"`
   */
  buttonText: string;
  /**
   * Variant of the modal that represents the type of action handled by the modal.
   */
  variant?: Variant;
  /**
   * If set, the user will be prompted to type the requiredInputText into an input field
   */
  requiredInputText?: string;
  /**
   * If `true`, the primary action button will be disabled
   */
  submitDisabled?: boolean;
  darkMode?: boolean;
}

export const ConfirmationModal = ({
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
          contentStyle,
          {
            [css`
              // TODO: Refresh – remove when darkMode is updated
              font-family: ${fontFamilies.legacy};
              font-size: 14px;
              line-height: 20px;
              padding: 36px;
              color: ${uiColors.white};
            `]: darkMode,
          },
          modeAndVariantContentStyles[mode][variant],
        )}
      >
        {/* TODO: Refresh - remove mode logic when darkmode is updated */}
        {variant === Variant.Danger && mode === Mode.Light && (
          <div className={cx(warningIconStyles)}>
            <WarningIcon fill={palette.red.base} role="presentation" />
          </div>
        )}
        <h1
          className={cx(titleStyle, {
            [css`
              // TODO: Refresh – remove when darkMode is updated
              font-weight: bold;
              line-height: 25px;
              margin-bottom: 10px;
              margin-top: revert;
              color: ${uiColors.gray.light2};
            `]: darkMode,
          })}
        >
          {title}
        </h1>
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
