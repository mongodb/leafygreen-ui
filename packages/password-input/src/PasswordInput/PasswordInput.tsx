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
  inputDisabledBaseStyles,
  inputDisabledThemeStyles,
  inputFocusThemeStyles,
  inputIconSizeStyles,
  inputSizeStyles,
  inputThemeStyles,
  inputWrapperStyles,
  labelBaseStyles,
  labelLargeOverrideStyles,
} from './PasswordInput.styles';
import {
  type MessageProps,
  PasswordInputProps,
  SizeVariant,
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
      className,
      darkMode: darkModeProp,
      label,
      sizeVariant = SizeVariant.Default,
      stateNotifications = [],
      disabled = false,
      autoComplete = 'new-password',
      id: idProp,
      'aria-describedby': ariaDescribedbyProp,
      'aria-labelledby': ariaLabelledbyProp,
      ...rest
    }: PasswordInputProps,
    forwardedRef,
  ) => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const prefix = 'passwordinput';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const ariaDescribedby = useIdAllocator({
      prefix,
      id: ariaDescribedbyProp,
    });
    const ariaLabelledby = useIdAllocator({
      prefix,
      id: ariaLabelledbyProp,
    });
    const { theme, darkMode } = useDarkMode(darkModeProp);
    const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    // If disabled then hide password
    useEffect(() => {
      if (disabled) setShowPassword(false);
    }, [disabled]);

    const handleTogglePasswordClick = () => setShowPassword(s => !s);

    const state: States = Array.isArray(stateNotifications)
      ? getStateFromArray(stateNotifications)
      : stateNotifications;

    const hasValidationMessages =
      !ariaDescribedbyProp && Array.isArray(stateNotifications);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(className)} ref={forwardedRef}>
          {label && (
            <Label
              id={ariaLabelledby}
              className={cx(labelBaseStyles, {
                [labelLargeOverrideStyles]: sizeVariant === SizeVariant.Large,
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
              aria-describedby={ariaDescribedby}
              aria-labelledby={ariaLabelledby}
              aria-disabled={disabled}
              aria-invalid={state === States.Error || state === States.Warning}
              className={cx(
                inputBaseStyles,
                inputSizeStyles[sizeVariant],
                inputFocusThemeStyles[theme],
                {
                  [inputThemeStyles[theme][state]]: !disabled,
                  [cx(
                    inputDisabledBaseStyles,
                    inputDisabledThemeStyles[theme],
                  )]: disabled,
                  [inputIconSizeStyles[sizeVariant]]:
                    !hasValidationMessages && state !== States.None,
                },
              )}
              onChange={handleChange}
              readOnly={disabled ? true : false}
              {...rest}
            />
            {/* Visual icons inside the input will only render if aria-describedby is set and the state is not `none`. None does not need a visible icon */}
            {!hasValidationMessages && state !== States.None && (
              <InputIcon state={state} sizeVariant={sizeVariant} />
            )}
            <TogglePassword
              disabled={disabled}
              showPassword={showPassword}
              handleTogglePasswordClick={handleTogglePasswordClick}
              sizeVariant={sizeVariant}
            />
          </div>
          {hasValidationMessages && (
            <StateNotifications
              ariaDescribedby={ariaDescribedby}
              messages={stateNotifications as Array<MessageProps>}
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
      message: PropTypes.string.isRequired,
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
  label: PropTypes.string,
  'aria-labelledby': PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  sizeVariant: PropTypes.oneOf(Object.values(SizeVariant)),
  value: PropTypes.string,
  /// @ts-ignore
  'aria-describedby': PropTypes.string,
  /// @ts-ignore
  stateNotifications: stateNotificationCheck,
};
