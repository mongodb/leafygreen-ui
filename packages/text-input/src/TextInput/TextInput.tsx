import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { css } from '@leafygreen-ui/emotion';
import { FormField, FormFieldInputContainer } from '@leafygreen-ui/form-field';
import { useValidation } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { consoleOnce } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  SizeVariant,
  State,
  TextInputComponentType,
  TextInputProps,
  TextInputType,
} from './TextInput.types';

/**
 * # TextInput
 *
 * TextInput component
 *
 * ```
<TextInput label='Input Label' onChange={() => execute when value of input field changes}/>
```
 * @param props.id id associated with the TextInput component.
 * @param props.label Text shown in bold above the input element.
 * @param props.description Text that gives more detail about the requirements for the input.
 * @param props.optional Whether or not the field is optional.
 * @param props.disabled Whether or not the field is currently disabled.
 * @param props.onChange Callback to be executed when the value of the input field changes.
 * @param props.onBlur Callback to be executed when the input stops being focused.
 * @param props.placeholder The placeholder text shown in the input field before the user begins typing.
 * @param props.errorMessage The message shown below the input field if the value is invalid.
 * @param props.state The current state of the TextInput. This can be none, valid, or error.
 * @param props.value The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
 * @param props.className className supplied to the TextInput container.
 * @param props.darkMode determines whether or not the component appears in dark theme.
 * @param props.sizeVariant determines the size of the text and the height of the input.
 */

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      description,
      onChange,
      onBlur,
      placeholder,
      errorMessage,
      optional = false,
      disabled = false,
      state = State.None,
      type = TextInputType.Text,
      id,
      value: controlledValue,
      className,
      darkMode: darkModeProp,
      sizeVariant = SizeVariant.Default,
      'aria-labelledby': ariaLabelledby,
      handleValidation,
      baseFontSize: baseFontSizeProp,
      ...rest
    }: TextInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);

    // Validation
    const validation = useValidation<HTMLInputElement>(handleValidation);

    const onBlurHandler: React.FocusEventHandler<HTMLInputElement> = e => {
      if (onBlur) {
        onBlur(e);
      }

      validation.onBlur(e);
    };

    const onValueChange: React.ChangeEventHandler<HTMLInputElement> = e => {
      if (onChange) {
        onChange(e);
      }

      if (!isControlled) {
        setValue(e.target.value);
      }

      validation.onChange(e);
    };

    if (type !== 'search' && !label && !ariaLabelledby) {
      console.error(
        'For screen-reader accessibility, label or aria-labelledby must be provided to TextInput.',
      );
    }

    if (type === 'search') {
      consoleOnce.warn(
        'We recommend using the Leafygreen SearchInput for `type="search"` inputs.',
      );
      if (!rest['aria-label']) {
        console.error(
          'For screen-reader accessibility, aria-label must be provided to TextInput.',
        );
      }
    }

    if (type === 'password') {
      consoleOnce.warn(
        'We recommend using the Leafygreen PasswordInput for `type="password"` inputs.',
      );
    }

    if (type === 'number') {
      consoleOnce.warn(
        'We recommend using the Leafygreen NumberInput for `type="number"` inputs.',
      );
    }

    return (
      <FormField
        label={label}
        description={description}
        errorMessage={errorMessage}
        state={state}
        size={sizeVariant}
        disabled={disabled}
        baseFontSize={baseFontSize}
        darkMode={darkMode}
        className={className}
        id={id}
        optional={optional}
      >
        <FormFieldInputContainer>
          <input
            {...rest}
            aria-labelledby={ariaLabelledby}
            type={type}
            value={value}
            required={!optional}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onValueChange}
            onBlur={onBlurHandler}
            ref={forwardRef}
            autoComplete={disabled ? 'off' : rest?.autoComplete || 'on'}
            aria-invalid={state === 'error'}
            className={css`
              width: 100%;
            `}
          />
        </FormFieldInputContainer>
      </FormField>
    );
  },
) as TextInputComponentType;

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  'aria-labelledby': PropTypes.string,
  description: PropTypes.string,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  state: PropTypes.oneOf(Object.values(State)),
  value: PropTypes.string,
  className: PropTypes.string,
  sizeVariant: PropTypes.oneOf(Object.values(SizeVariant)),
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  darkMode: PropTypes.bool,
};

export default TextInput;
