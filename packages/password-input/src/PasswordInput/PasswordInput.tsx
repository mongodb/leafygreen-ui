import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { InputIcon } from '../InputIcon';
import { StateNotifications } from '../StateNotifications';
import { TogglePassword } from '../TogglePassword';

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
  States,
} from './PasswordInput.types';
import { getStateFromArray } from './utils';

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
    const labelId = useIdAllocator({
      prefix,
      id: ariaLabelledbyProp,
    });
    const { theme, darkMode } = useDarkMode(darkModeProp);
    const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    if (!label && !ariaLabelledbyProp && !rest['aria-label']) {
      console.warn(
        'For screen-reader accessibility, label, aria-labelledby, or aria-label must be provided to PasswordInput component',
      );
    }

    // If disabled then hide password
    useEffect(() => {
      if (disabled) setShowPassword(false);
    }, [disabled]);

    const handleTogglePasswordClick = () => setShowPassword(s => !s);

    /**
     * The overall state of the component
     */
    const state: States = Array.isArray(stateNotifications)
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
              id={labelId}
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
              aria-labelledby={labelId}
              aria-disabled={disabled}
              aria-invalid={state === States.Error || state === States.Warning}
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
                    !hasNotifications && state !== States.None,
                },
              )}
              onChange={handleChange}
              readOnly={disabled ? true : false}
              {...rest}
            />
            {/* If a custom message container is used, an icon will render inside the input to represent the state of the input. In the case that stateNotification === `none`, no icon will appear. */}
            {!hasNotifications && state !== States.None && (
              <InputIcon state={state} size={size} />
            )}
            <TogglePassword
              disabled={disabled}
              showPassword={showPassword}
              handleTogglePasswordClick={handleTogglePasswordClick}
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

const stateNotificationCheck = function (
  props: { [x: string]: any },
  propName: string,
  ...rest: ['componentName', 'location', 'propFullName']
) {
  const stateStringProp = PropTypes.oneOf(Object.values(States)).isRequired;
  const arrayProp = PropTypes.arrayOf(
    PropTypes.shape({
      state: PropTypes.oneOf(Object.values(States)).isRequired,
      notification: PropTypes.string.isRequired,
    }),
  );
  const ariaProp = 'aria-describedby';

  const stateStringType = stateStringProp(props, propName, ...rest);
  const arrayType = arrayProp(props, propName, ...rest);

  if (typeof props[ariaProp] === 'string') return stateStringType;
  if (typeof props[ariaProp] === 'undefined') return arrayType;

  return new Error('Error');
};

PasswordInput.propTypes = {
  id: PropTypes.string,
  /// @ts-ignore
  'aria-label': PropTypes.string,
  /// @ts-ignore
  'aria-labelledby': PropTypes.string,
  /// @ts-ignore
  label: PropTypes.string,
  /// @ts-ignore
  'aria-describedby': PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  value: PropTypes.string,
  /// @ts-ignore
  stateNotifications: stateNotificationCheck,
};
