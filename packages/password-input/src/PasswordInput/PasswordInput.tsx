import React, { useState } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Label } from '@leafygreen-ui/typography';

import { TogglePassword } from '../TogglePassword';
import { ValidationMessage } from '../ValidationMessage';

import {
  inputBaseStyles,
  inputFocusThemeStyles,
  inputSizeStyles,
  inputThemeStyles,
  inputWrapperStyles,
  labelBaseStyles,
  messageWrapperStyles,
} from './PasswordInput.styles';
import { PasswordInputProps, SizeVariant, States } from './PasswordInput.types';

// function allEqual(arr: Array<any>) {
//   return new Set(arr).size == 1;
// }

export const PasswordInput = React.forwardRef<
  HTMLInputElement,
  PasswordInputProps
>(
  (
    {
      value: valueProp,
      placeholder,
      onChange: onChangeProp,
      className,
      darkMode: darkModeProp,
      label,
      sizeVariant = SizeVariant.Default,
      validations = [],
      disabled = false,
      autoComplete = 'new-password',
      id: idProp,
      'aria-describedby': ariaDescribedbyProp,
      'aria-labelledby': ariaLabelledbyProp,
      state: stateProp, //TODO: get rid of this prop
      ...rest
    }: PasswordInputProps,
    forwardedRef,
  ) => {
    const [state, setState] = useState<States>(States.None);
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
    // const { value, handleChange } = useControlledValue(valueProp, onChangeProp);

    // const validationStates: Array<States> = useMemo(() => [], []);

    const handleTogglePasswordClick = () => setShowPassword(s => !s);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(className)}>
          {label && (
            <Label
              id={ariaLabelledby}
              className={labelBaseStyles}
              htmlFor={inputId}
            >
              {label}
            </Label>
          )}
          <div className={inputWrapperStyles}>
            <input
              ref={forwardedRef}
              type={showPassword ? 'text' : 'password'}
              // value={value}
              id={inputId}
              autoComplete={autoComplete}
              aria-describedby={ariaDescribedby}
              aria-labelledby={ariaLabelledby}
              aria-disabled={disabled}
              className={cx(
                inputBaseStyles,
                inputSizeStyles[sizeVariant],
                inputFocusThemeStyles[theme],
                inputThemeStyles[theme][state],
              )}
              // onChange={handleChange}
              {...rest}
            />
            <TogglePassword
              disabled={disabled}
              showPassword={showPassword}
              handleTogglePasswordClick={handleTogglePasswordClick}
              sizeVariant={sizeVariant}
            />
          </div>
          <ul className={messageWrapperStyles} id={ariaDescribedby}>
            <ValidationMessage message="one" state={States.Error} />
            <ValidationMessage message="two" state={States.Warning} />
            <ValidationMessage
              message="This is a really long line of text that will wrap"
              state={States.Valid}
            />
            <ValidationMessage message="four" state={States.None} />
          </ul>
        </div>
      </LeafyGreenProvider>
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
