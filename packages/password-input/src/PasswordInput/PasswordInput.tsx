import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { DEFAULT_MESSAGES } from '@leafygreen-ui/form-field';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { PasswordInputFeedback } from '../PasswordInputFeedback';
import { PasswordToggle } from '../PasswordToggle';

import {
  getInputDisabledStyles,
  inputBaseStyles,
  inputBaseThemeStyles,
  inputSizeStyles,
  inputThemeStyles,
  inputWrapperStyles,
  labelBaseStyles,
  labelLargeOverrideStyles,
} from './PasswordInput.styles';
import {
  type NotificationProps,
  PasswordInputProps,
  Size,
  State,
} from './PasswordInput.types';
import {
  convertStateToFormFieldState,
  getStateFromArray,
  stateNotificationCheck,
} from './utils';

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      value: valueProp,
      onChange: onChangeProp,
      darkMode: darkModeProp,
      id: idProp,
      'aria-describedby': ariaDescribedbyProp,
      'aria-labelledby': ariaLabelledbyProp,
      'aria-label': ariaLabelProp,
      size = Size.Default,
      errorMessage = DEFAULT_MESSAGES.error,
      successMessage = DEFAULT_MESSAGES.success,
      stateNotifications = [],
      disabled = false,
      autoComplete = 'new-password',
      className,
      label,
      ...rest
    }: PasswordInputProps,
    forwardedRef,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const prefix = 'lg-passwordinput';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const feedbackId = useIdAllocator({
      prefix,
      id: ariaDescribedbyProp,
    });
    const { theme, darkMode } = useDarkMode(darkModeProp);
    const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    if (!label && !ariaLabelledbyProp && !ariaLabelProp) {
      console.warn(
        'For screen-reader accessibility, label, aria-labelledby, or aria-label must be provided to PasswordInput component',
      );
    }

    const handlePasswordToggleClick = () => setShowPassword(s => !s);

    /**
     * Checks if component may render state notifications
     */
    const hasStateNotifications = Array.isArray(stateNotifications);

    /**
     * The overall state of the component
     */
    const state: State = hasStateNotifications
      ? getStateFromArray(stateNotifications)
      : stateNotifications;

    /**
     * The form field state of the component
     */
    const formFieldState = convertStateToFormFieldState(state);

    /**
     * Determines rendering either custom container
     * or one of state notifications or state feedback
     */
    const hasCustomDescription = !!ariaDescribedbyProp;

    const formFieldFeedbackProps = {
      disabled,
      errorMessage,
      size,
      state: formFieldState,
      successMessage,
    } as const;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={className} ref={forwardedRef}>
          {label && (
            <Label
              className={cx(labelBaseStyles, {
                [labelLargeOverrideStyles]: size === Size.Large,
              })}
              htmlFor={inputId}
              disabled={disabled}
            >
              {label}
            </Label>
          )}
          <div className={inputWrapperStyles}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={value}
              id={inputId}
              autoComplete={autoComplete}
              aria-describedby={feedbackId}
              aria-labelledby={
                !label && ariaLabelledbyProp ? ariaLabelledbyProp : undefined
              }
              aria-label={!label && ariaLabelProp ? ariaLabelProp : undefined}
              aria-disabled={disabled}
              aria-invalid={state === State.Error || state === State.Warning}
              className={cx(
                inputBaseStyles,
                inputSizeStyles[size],
                inputBaseThemeStyles[theme],
                {
                  [inputThemeStyles[theme][state]]: !disabled,
                  [cx(getInputDisabledStyles(theme))]: disabled,
                },
              )}
              onChange={handleChange}
              readOnly={disabled}
              {...rest}
            />
            <PasswordToggle
              showPassword={showPassword}
              handlePasswordToggleClick={handlePasswordToggleClick}
              size={size}
            />
          </div>
          <PasswordInputFeedback
            id={feedbackId}
            hasCustomDescription={hasCustomDescription}
            hasStateNotifications={hasStateNotifications}
            notifications={stateNotifications as Array<NotificationProps>}
            formFieldFeedbackProps={formFieldFeedbackProps}
          />
        </div>
      </LeafyGreenProvider>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

PasswordInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  'aria-describedby': PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  value: PropTypes.string,
  stateNotifications: stateNotificationCheck,
} as any;
