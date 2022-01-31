import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import Modal, { Footer } from '@leafygreen-ui/modal';
import { uiColors, palette } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';

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

const titleStyle = {
  [Mode.Light]: css`
    font-size: 24px;
    font-weight: bold;
    line-height: 25px;
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

const titleColors = {
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
`;

const contentStyle = {
  [Mode.Light]: css`
    font-family: Euclid Circular A, ‘Helvetica Neue’, Helvetica, Arial, sans-serif; // TODO: Refresh – remove when fonts are updated
    font-size: 13px;
    line-height: 20px;
    letter-spacing: 0;
    padding: 35px 40px 0px;
  `,
  [Mode.Dark]: css`
    font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0;
    padding: 36px;
  `,
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

const buttonStyle = css`
  margin: 0 2px;

  &:first-of-type {
    margin: 0 0 0 4px;
  }

  &:last-of-type {
    margin: 0 4px 0 0;
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
      <div className={cx(contentStyle[mode], contentColors[mode])}>
        <h1 className={cx(titleStyle[mode], titleColors[mode])}>{title}</h1>
        {children}
        {textEntryConfirmation}
      </div>
      <Footer darkMode={darkMode}>
        <Button
          variant={variant}
          disabled={!confirmEnabled || submitDisabled}
          onClick={onConfirm}
          className={buttonStyle}
          darkMode={darkMode}
        >
          {buttonText}
        </Button>
        <Button onClick={onCancel} className={buttonStyle} darkMode={darkMode}>
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
