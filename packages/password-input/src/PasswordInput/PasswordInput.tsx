import React, { useEffect, useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { InputIcon } from '../InputIcon';
import { TogglePassword } from '../TogglePassword';
import { ValidationMessage } from '../ValidationMessage';

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
  messageWrapperStyles,
} from './PasswordInput.styles';
import {
  PasswordInputProps,
  SizeVariant,
  States,
  ValidationStateProps,
} from './PasswordInput.types';

function allEqual(arr: Array<any>) {
  return new Set(arr).size == 1;
}

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
      validationState = [],
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

    const getStateFromArray = (): States => {
      if (validationState.length === 0) return States.None;

      const statesArray: Array<States> = (
        validationState as Array<ValidationStateProps>
      ).map((message: ValidationStateProps) => message.state);

      // if (statesArray.length === 1) return statesArray[0];
      if (allEqual(statesArray)) return statesArray[0];
      if (statesArray.includes(States.Error)) return States.Error;
      if (statesArray.includes(States.Warning)) return States.Warning;

      return States.None;
    };

    const state: States = Array.isArray(validationState)
      ? getStateFromArray()
      : validationState;

    const hasValidationMessages =
      !ariaDescribedbyProp && Array.isArray(validationState);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(className)} ref={forwardedRef}>
          {label && (
            <Label
              id={ariaLabelledby}
              className={labelBaseStyles}
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
            // We're using aria-polite to announce when a message has changed. In order for aria-polite to work correctly the message wrapper needs to remain on the page even if there are no messages. If a custom message container is specified with aria-describedby then this wrapper will not render.
            <ul
              aria-live="polite"
              className={messageWrapperStyles}
              id={ariaDescribedby}
            >
              {(validationState as Array<ValidationStateProps>).map(
                (message, index) => (
                  <ValidationMessage
                    key={index} //TODO: don't use index
                    message={message.message as string}
                    state={message.state}
                  />
                ),
              )}
            </ul>
          )}
        </div>
      </LeafyGreenProvider>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';

//TODO: propTypes!
