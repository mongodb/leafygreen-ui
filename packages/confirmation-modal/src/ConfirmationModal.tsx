import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { cx } from '@leafygreen-ui/emotion';
import Button from '@leafygreen-ui/button';
import Modal, { Footer } from '@leafygreen-ui/modal';
import { palette } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { H3 } from '@leafygreen-ui/typography';
import {
  baseModalStyle,
  buttonStyle,
  contentStyle,
  contentThemeStyles,
  contentVariantStyles,
  textEntryInputStyle,
  titleStyle,
  warningIconStyle,
  warningIconThemeStyle,
} from './ConfirmationModal.styles';
import { ConfirmationModalProps, Variant } from './ConfirmationModal.types';

export const ConfirmationModal = ({
  children,
  title,
  requiredInputText,
  buttonText,
  submitDisabled = false,
  variant = Variant.Default,
  onConfirm,
  onCancel,
  darkMode: darkModeProp,
  ...modalProps
}: ConfirmationModalProps) => {
  const [confirmEnabled, setConfirmEnabled] = useState(!requiredInputText);
  const { theme, darkMode } = useDarkMode(darkModeProp);

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
          contentThemeStyles[theme],
          contentVariantStyles[variant],
        )}
      >
        {variant === Variant.Danger && (
          <div className={cx(warningIconStyle, warningIconThemeStyle[theme])}>
            <WarningIcon
              fill={darkMode ? palette.red.light3 : palette.red.base}
              role="presentation"
            />
          </div>
        )}
        <H3 as="h1" className={cx(titleStyle)}>
          {title}
        </H3>
        {children}
        {textEntryConfirmation}
      </div>
      <Footer>
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
  darkMode: PropTypes.bool,
};
