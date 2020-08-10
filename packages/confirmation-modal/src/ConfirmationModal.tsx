import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import Modal, { Footer } from '@leafygreen-ui/modal';
import { uiColors } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';

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

interface ConfirmationModalProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  onClose?: (confirmed: boolean) => void;
  className?: string;
  buttonText: string;
  dangerous?: boolean;
  requiredInputText?: string;
}

const ConfirmationModal = ({
  children,
  title,
  requiredInputText,
  buttonText,
  dangerous = false,
  onClose,
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
    <Modal
      {...modalProps}
      contentClassName={baseModalStyle}
      setOpen={() => onClose?.(false)}
    >
      <div className={contentStyle}>
        <div className={titleStyle}>{title}</div>
        {children}
        {textEntryConfirmation}
      </div>
      <Footer>
        <Button
          variant={dangerous ? 'danger' : 'primary'}
          disabled={!confirmEnabled}
          onClick={() => onClose?.(true)}
        >
          {buttonText}
        </Button>
        <Button onClick={() => onClose?.(false)}>Cancel</Button>
      </Footer>
    </Modal>
  );
};

ConfirmationModal.displayName = 'ConfirmationModal';

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  buttonText: PropTypes.string,
  dangerous: PropTypes.bool,
  requiredInputText: PropTypes.string,
};

export default ConfirmationModal;
