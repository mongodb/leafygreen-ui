import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Button, { Variant as ButtonVariant } from '@leafygreen-ui/button';
import Modal, { Footer, ModalProps } from '@leafygreen-ui/modal';
import { palette } from '@leafygreen-ui/palette';
import TextInput from '@leafygreen-ui/text-input';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { fontFamilies, typeScales } from '@leafygreen-ui/tokens';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { H3 } from '@leafygreen-ui/typography';
import { Theme } from '@leafygreen-ui/lib';

export const Variant = {
  Default: ButtonVariant.Primary,
  Danger: ButtonVariant.Danger,
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const titleStyle = css`
  line-height: 32px;
  margin-bottom: 10px;
`;

const baseModalStyle = css`
  width: 600px;
  padding: initial;
  letter-spacing: 0;
`;

const contentStyle = css`
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  line-height: ${typeScales.body1.lineHeight}px;
`;

const contentThemeStyles: Record<Theme, string> = {
  [Theme.Light]: css``,
  [Theme.Dark]: css`
    color: ${palette.gray.light1};
  `,
};

const contentVariantStyles: Record<Variant, string> = {
  [Variant.Default]: css`
    padding: 40px 36px 0px;
  `,
  [Variant.Danger]: css`
    padding: 40px 36px 0px 78px;
  `,
};

const textEntryInputStyle = css`
  width: 300px;
  margin-top: 14px;

  label {
    margin-bottom: 3px;
  }
`;

const buttonStyle = css`
  margin: 0 2px;

  &:first-of-type {
    margin: 0 0 0 5px;
  }

  &:last-of-type {
    margin: 0 5px 0 0;
  }
`;

const warningIconStyle = css`
  width: 32px;
  height: 32px;
  border-radius: 50%;
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

const warningIconThemeStyle: Record<Theme, string> = {
  [Theme.Light]: css`
    background: ${palette.red.light3};
  `,
  [Theme.Dark]: css`
    background: ${palette.red.dark2};
  `,
};

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
          className={buttonStyle} // TODO: look into this
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
