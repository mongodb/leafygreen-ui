import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import Button, { Variant } from '@leafygreen-ui/button';
import Modal from '@leafygreen-ui/modal';
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
  padding-top: 14px;
`;

const footerStyle = css`
  &:before {
    content: '';
    display: block;
    position: relative;
    width: 100%;
    border-top: 1px solid ${uiColors.gray.light2};
  }
`;

const footerContentStyle = css`
  display: flex;
  justify-content: right;
  flex-direction: row-reverse;
  column-gap: 5px;
  padding: 16px 24px;
`;

interface ConfirmationModalProps {
  title: string;
  children: React.ReactNode;
  open?: boolean;
  className?: string;
  primaryActionProps: ActionProps;
  secondaryActionProps: ActionProps;
  requireTextEntryConfirmation?: boolean;
}

interface ActionProps {
  label: string;
  onClick?: () => void;
  variant?: Variant;
}

const ConfirmationModal = ({
  children,
  title,
  primaryActionProps: { label: primaryActionLabel, ...primaryActionProps },
  secondaryActionProps: {
    label: secondaryActionLabel,
    ...secondaryActionProps
  },
  requireTextEntryConfirmation = false,
  ...modalProps
}: ConfirmationModalProps) => {
  const [primaryActionEnabled, setPrimaryActionEnabled] = useState(
    !requireTextEntryConfirmation,
  );

  const textEntryConfirmation = useMemo(() => {
    setPrimaryActionEnabled(!requireTextEntryConfirmation);

    let textEntryConfirmation = null;

    if (requireTextEntryConfirmation) {
      const requiredText = primaryActionLabel.toLowerCase();

      const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPrimaryActionEnabled(event.target.value === requiredText);
      };
      textEntryConfirmation = (
        <div>
          <TextInput
            label={`Type "${requiredText}" to confirm your action`}
            className={textEntryInputStyle}
            onChange={onInputChange}
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
          ></TextInput>
        </div>
      );
    }

    return textEntryConfirmation;
  }, [primaryActionLabel, requireTextEntryConfirmation]);

  return (
    <Modal {...modalProps} contentClassName={baseModalStyle}>
      <div className={contentStyle}>
        <div className={titleStyle}>{title}</div>
        {children}
        {textEntryConfirmation}
      </div>
      <div className={footerStyle}>
        <div className={footerContentStyle}>
          <Button
            variant="primary"
            {...primaryActionProps}
            disabled={!primaryActionEnabled}
          >
            {primaryActionLabel}
          </Button>
          <Button {...secondaryActionProps}>{secondaryActionLabel}</Button>
        </div>
      </div>
    </Modal>
  );
};

ConfirmationModal.displayName = 'ConfirmationModal';

const actionPropType = PropTypes.shape({
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(Object.values(Variant)),
  onClick: PropTypes.func,
}).isRequired;

ConfirmationModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  primaryActionProps: actionPropType,
  secondaryActionProps: actionPropType,
  requireTextEntryConfirmation: PropTypes.bool,
};

export default ConfirmationModal;
