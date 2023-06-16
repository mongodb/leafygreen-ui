import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { InputIcon } from '../InputIcon';
import { PasswordToggle } from '../PasswordToggle';
import { StateNotifications } from '../StateNotifications';

import {
  inputBaseStyles,
  inputBaseThemeStyles,
  inputDisabledBaseStyles,
  inputDisabledThemeStyles,
  inputIconSizeStyles,
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
import { getStateFromArray, stateNotificationCheck } from './utils';

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
    const descriptionId = useIdAllocator({
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
     * The overall state of the component
     */
    const state: State = Array.isArray(stateNotifications)
      ? getStateFromArray(stateNotifications)
      : stateNotifications;

    /**
     * Checks if there are any notifications
     */
    const hasNotifications: boolean =
      !ariaDescribedbyProp && Array.isArray(stateNotifications);

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
              aria-describedby={descriptionId}
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
                  [cx(
                    inputDisabledBaseStyles,
                    inputDisabledThemeStyles[theme],
                  )]: disabled,
                  [inputIconSizeStyles[size]]:
                    !hasNotifications && state !== State.None,
                },
              )}
              onChange={handleChange}
              readOnly={disabled}
              {...rest}
            />
            {/* If a custom message container is used, an icon will render inside the input to represent the state of the input. In the case that stateNotification === `none`, no icon will appear. */}
            {!hasNotifications && state !== State.None && (
              <InputIcon state={state} size={size} disabled={disabled} />
            )}
            <PasswordToggle
              showPassword={showPassword}
              handlePasswordToggleClick={handlePasswordToggleClick}
              size={size}
            />
          </div>
          {hasNotifications && (
            <StateNotifications
              id={descriptionId}
              notifications={stateNotifications as Array<NotificationProps>}
            />
          )}
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
