import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import CheckmarkIcon from '@leafygreen-ui/icon/dist/Checkmark';
import CheckmarkWithCircleIcon from '@leafygreen-ui/icon/dist/CheckmarkWithCircle';
import WarningIcon from '@leafygreen-ui/icon/dist/Warning';
import { useIdAllocator, useValidation } from '@leafygreen-ui/hooks';
import {
  Description,
  Label,
  useUpdatedBaseFontSize,
} from '@leafygreen-ui/typography';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { TextInputProps, SizeVariant, State, TextInputType } from './types';
import {
  iconClassName,
  wrapperStyle,
  errorMessageStyle,
  inputContainerStyle,
  optionalTextStyle,
  baseInputStyle,
  stateIndicatorStyles,
  errorMessageModeStyle,
  getWrapperFontSize,
  inputSizeStyles,
  inputModeStyles,
  inputStateStyles,
  inputFocusStyles,
  inputIndicatorStyle,
  inputIndicatorSizeStyle,
  inheritTypeScale,
  textContainerStyle,
} from './style';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

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

type TextInput = React.ForwardRefExoticComponent<TextInputProps>;
const TextInput: TextInput = forwardRef<HTMLInputElement, TextInputProps>(
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
      id: propsId,
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
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const id = useIdAllocator({ prefix: 'textinput', id: propsId });
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
      console.warn(
        'We recommend using the Leafygreen SearchInput for `type="search" inputs.',
      );
      if (!rest['aria-label']) {
        console.error(
          'For screen-reader accessibility, aria-label must be provided to TextInput.',
        );
      }
    }

    const RenderedCheckmarkIcon = darkMode
      ? CheckmarkWithCircleIcon
      : CheckmarkIcon;

    return (
      <div
        className={cx(
          wrapperStyle,
          getWrapperFontSize(sizeVariant, baseFontSize),
          className,
        )}
      >
        {(label || description) && (
          <div className={textContainerStyle}>
            {label && (
              <Label
                darkMode={darkMode}
                htmlFor={id}
                disabled={disabled}
                className={inheritTypeScale}
              >
                {label}
              </Label>
            )}
            {description && (
              <Description
                darkMode={darkMode}
                disabled={disabled}
                className={inheritTypeScale}
              >
                {description}
              </Description>
            )}
          </div>
        )}
        <div className={inputContainerStyle}>
          <input
            {...rest}
            aria-labelledby={ariaLabelledby}
            type={type}
            className={cx(
              baseInputStyle,
              inputModeStyles[theme],
              inputSizeStyles[sizeVariant],
              inputStateStyles[state][theme],
              inputFocusStyles[theme], // Always show focus styles
              {
                [css`
                  padding-right: 60px;
                `]: optional && !disabled,
              },
            )}
            value={value}
            required={!optional}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onValueChange}
            onBlur={onBlurHandler}
            ref={forwardRef}
            id={id}
            autoComplete={disabled ? 'off' : rest?.autoComplete || 'on'}
            aria-invalid={state === 'error'}
          />

          <div
            className={cx(
              iconClassName,
              inputIndicatorStyle,
              inputIndicatorSizeStyle[sizeVariant],
            )}
          >
            {/* Render State Icon or Optional text*/}
            {state === State.Valid && (
              <RenderedCheckmarkIcon
                role="presentation"
                className={stateIndicatorStyles.valid[theme]}
              />
            )}

            {state === State.Error && (
              <WarningIcon
                role="presentation"
                className={stateIndicatorStyles.error[theme]}
              />
            )}

            {state === State.None && !disabled && optional && (
              <div className={optionalTextStyle}>
                <p>Optional</p>
              </div>
            )}
          </div>
        </div>
        {state === State.Error && errorMessage && (
          <div className={cx(errorMessageStyle, errorMessageModeStyle[theme])}>
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
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
};

export default TextInput;
