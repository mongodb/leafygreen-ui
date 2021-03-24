import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import Modal, { Footer } from '@leafygreen-ui/modal';
import { uiColors } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';

export const Variant = {
  Default: ButtonVariant.Primary,
  Danger: ButtonVariant.Danger,
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const titleStyle = css`
  color: ${uiColors.gray.dark2};
  font-size: 24px;
  font-weight: bold;
  line-height: 25px;

  margin-bottom: 10px;
`;

const baseModalStyle = css`
  width: 600px;
  padding: initial;
`;

const contentStyle = css`
  color: ${uiColors.gray.dark1};
  font-family: Akzidenz, ‘Helvetica Neue’, Helvetica, Arial, sans-serif;
  font-size: 16px;
  letter-spacing: 0;
  line-height: 24px;

  padding: 36px;
`;

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
  ...modalProps
}: ConfirmationModalProps) => {
  const [confirmEnabled, setConfirmEnabled] = useState(!requiredInputText);

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
        ></TextInput>
      );
    }

    return textEntryConfirmation;
  }, [requiredInputText]);

  return (
    <Modal {...modalProps} contentClassName={baseModalStyle} setOpen={onCancel}>
      <div className={contentStyle}>
        <h1 className={titleStyle}>{title}</h1>
        {children}
        {textEntryConfirmation}
      </div>
      <Footer>
        <Button
          variant={variant}
          disabled={!confirmEnabled || submitDisabled}
          onClick={onConfirm}
          className={buttonStyle}
        >
          {buttonText}
        </Button>
        <Button onClick={onCancel} className={buttonStyle}>
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
