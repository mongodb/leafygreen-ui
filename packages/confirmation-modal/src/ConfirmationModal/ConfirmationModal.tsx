import React, { forwardRef, useMemo, useRef, useState } from 'react';

import { Button } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import { useMergeRefs } from '@leafygreen-ui/hooks';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Footer, Modal } from '@leafygreen-ui/modal';
import { palette } from '@leafygreen-ui/palette';
import { TextInput } from '@leafygreen-ui/text-input';
import { H3 } from '@leafygreen-ui/typography';

import { getLgIds } from '../utils/getLgIds';

import {
  baseModalStyle,
  buttonStyle,
  contentDarkModeStyles,
  contentStyle,
  contentVariantStyles,
  textEntryInputStyle,
  titleStyle,
  warningIconStyle,
  warningIconThemeStyle,
} from './ConfirmationModal.styles';
import { ConfirmationModalProps, Variant } from './ConfirmationModal.types';

/**
 * Modals can be used to display a simple task, confirm actions, prompt users to input information, or display additional information.
 */
export const ConfirmationModal = forwardRef<
  HTMLDialogElement,
  ConfirmationModalProps
>(
  (
    {
      children,
      title,
      requiredInputText,
      buttonText,
      submitDisabled,
      variant = Variant.Default,
      onConfirm,
      onCancel,
      darkMode: darkModeProp,
      confirmButtonProps = {},
      cancelButtonProps = {},
      'data-lgid': dataLgId,
      initialFocus: initialFocusProp,
      ...modalProps
    },
    fwdRef,
  ) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const internalCancelButtonRef = useRef<HTMLButtonElement>(null);
    const cancelButtonRef = useMergeRefs([
      internalCancelButtonRef,
      cancelButtonProps.ref,
    ]);
    const internalConfirmButtonRef = useRef<HTMLButtonElement>(null);
    const confirmButtonRef = useMergeRefs([
      internalConfirmButtonRef,
      confirmButtonProps.ref,
    ]);

    const [confirmEnabled, setConfirmEnabled] = useState(!requiredInputText);
    const { theme, darkMode } = useDarkMode(darkModeProp);

    const lgIds = getLgIds(dataLgId);

    const initialFocus = useMemo(() => {
      if (initialFocusProp) {
        return initialFocusProp;
      }

      if (requiredInputText) {
        return textInputRef;
      }

      if (variant === Variant.Danger) {
        return internalCancelButtonRef;
      }

      return internalConfirmButtonRef;
    }, [initialFocusProp, requiredInputText, variant]);

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
            darkMode={darkMode}
            data-testid={lgIds.input}
            ref={textInputRef}
          />
        );
      }

      return textEntryConfirmation;
    }, [requiredInputText, darkMode, lgIds.input]);

    // TODO: remove - onConfirm is deprecated
    const _onConfirm = onConfirm || confirmButtonProps?.onClick;
    // TODO: remove - onCancel is deprecated
    const _onCancel = onCancel || cancelButtonProps?.onClick;

    const resetConfirmButton = () => {
      if (!requiredInputText) return;
      setConfirmEnabled(false);
    };

    const handleConfirm = () => {
      _onConfirm?.();
      resetConfirmButton();
    };

    const handleCancel = () => {
      _onCancel?.();
      resetConfirmButton();
    };

    // TODO: remove - submitDisabled is deprecated
    const isConfirmDisabled =
      submitDisabled ?? confirmButtonProps?.disabled ?? false;

    return (
      <Modal
        data-testid={lgIds.root}
        data-lgid={lgIds.root}
        {...modalProps}
        className={baseModalStyle}
        darkMode={darkMode}
        initialFocus={initialFocus}
        ref={fwdRef}
        setOpen={handleCancel}
      >
        <div
          className={cx(contentStyle, contentVariantStyles[variant], {
            [contentDarkModeStyles]: darkMode,
          })}
        >
          {variant === Variant.Danger && (
            <div className={cx(warningIconStyle, warningIconThemeStyle[theme])}>
              <WarningIcon
                fill={darkMode ? palette.red.light3 : palette.red.base}
                role="presentation"
              />
            </div>
          )}
          <H3 as="h1" className={cx(titleStyle)} data-testid={lgIds.title}>
            {title}
          </H3>
          {children}
          {textEntryConfirmation}
        </div>
        <Footer>
          <Button
            data-testid={lgIds.cancel}
            {...cancelButtonProps}
            onClick={handleCancel}
            className={cx(buttonStyle, cancelButtonProps?.className)}
            ref={cancelButtonRef}
          >
            Cancel
          </Button>
          <Button
            data-testid={lgIds.confirm}
            {...confirmButtonProps}
            disabled={!confirmEnabled || isConfirmDisabled}
            className={cx(buttonStyle, confirmButtonProps?.className)}
            variant={variant}
            onClick={handleConfirm}
            ref={confirmButtonRef}
          >
            {/* TODO: remove - buttonText is deprecated */}
            {buttonText || confirmButtonProps?.children || 'Confirm'}
          </Button>
        </Footer>
      </Modal>
    );
  },
);

ConfirmationModal.displayName = 'ConfirmationModal';
