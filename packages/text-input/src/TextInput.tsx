import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

export const State = {
  none: 'none',
  valid: 'valid',
  error: 'error',
} as const;

export type State = typeof State[keyof typeof State];

interface TextInputProps {
  /**
   * Text shown in bold above the input element.
   */
  label?: string;
  /**
   * Text that gives more detail about the requirements for the input.
   */
  description?: string;
  /**
   * Whether or not the field is optional. This is false by default.
   */
  optional?: boolean;
  /**
   * Whether or not the field is currently disabled. This is false by default.
   */
  disabled?: boolean;
  /**
   * Callback to be executed when the value of the input field changes.
   */
  onChange?: Function;
  /**
   * The placeholder text shown in the input field before the user begins typing.
   */
  placeholder?: string;
  /**
   * The message shown below the input field if the value is invalid.
   */
  errorMessage?: string;
  /**
   * The current state of the TextInput. This can be none, valid, or error.
   */
  state?: State;
  /**
   * The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
   */
  value?: string;
  /**
   * Callback used to set the value of the input field.
   */
  setValue?: Function;
  /**
   * className supplied to the TextInput container.
   */
  className?: string;
}

/**
 * # TextInput
 *
 * TextInput component
 *
 * ```
<TextInput label={'Input Label'} onChange={() => execute when value of input field changes}/>
```
 * @param props.label Text shown in bold above the input element.
 * @param props.description Text that gives more detail about the requirements for the input.
 * @param props.optional Whether or not the field is optional.
 * @param props.disabled Whether or not the field is currently disabled.
 * @param props.onChange Callback to be executed when the value of the input field changes.
 * @param props.placeholder The placeholder text shown in the input field before the user begins typing.
 * @param props.errorMessage The message shown below the input field if the value is invalid.
 * @param props.state The current state of the TextInput. This can be none, valid, or error.
 * @param props.value The current value of the input field. If a value is passed to this prop, component will be controlled by consumer.
 * @param props.setValue Callback used to set the value of the input field.
 * @param props.className className supplied to the TextInput container.
 */
const TextInput = React.forwardRef(
  (
    {
      label,
      description,
      optional = false,
      disabled = false,
      onChange,
      placeholder,
      errorMessage,
      state,
      value: controlledValue,
      setValue: setControlledValue,
      className,
    }: TextInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
    const isControlled = typeof controlledValue === 'string';
    const [uncontrolledValue, setUncontrolledValue] = useState('');
    const value = isControlled ? controlledValue : uncontrolledValue;
    const setValue = isControlled ? setControlledValue : setUncontrolledValue;

    function getColorFromValidationState() {
      if (state == State.none) {
        return '#CCC';
      } else {
        return state == State.valid ? '#13AA52' : '#CF4A22';
      }
    }

    function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
      if (onChange != undefined) {
        state = onChange(e.target.value);
      }

      if (setValue != undefined) {
        setValue(e.target.value);
      }
    }

    const textInputStyle = css`
      display: flex;
      flex-direction: column;
    `;

    const labelStyle = css`
      color: #3d4f58;
      font-size: 14px;
      font-weight: bold;
      height: 20px;
      padding-bottom: 8px;
    `;

    const descriptionStyle = css`
      color: #5d6c74;
      font-size: 14px;
      height: ${description === '' ? '0' : '20'}px;
      font-weight: normal;
      padding-bottom: 8px;
    `;

    const inputContainerStyle = css`
      position: relative;
      display: flex;
      align-items: center;
    `;

    const inputStyle = css`
      width: 400px;
      height: 36px;
      border-radius: 4px;
      border: 1px solid ${getColorFromValidationState()};
      padding-left: 12px;
      background: ${disabled ? '#E7EEEC' : '#FFFFFF'};
      font-size: 14px;
      font-weight: normal;
      &: placeholder {
        color: #89989b;
      }
    `;

    const errorIconStyle = css`
      position: absolute;
      right: 10px;
      color: #cf4a22;
    `;

    const validIconStyle = css`
      position: absolute;
      right: 10px;
      color: #13aa52;
    `;

    const optionalStyle = css`
      position: absolute;
      right: 12px;
      color: #5d6c74;
      font-size: 12px;
      font-style: italic;
      font-weight: normal;
    `;

    const errorMessageStyle = css`
      color: #cf4a22;
      font-size: 14px;
      height: 20px;
      padding-top: 4px;
      font-weight: normal;
      display: ${state == State.error ? '' : 'none'};
    `;

    return (
      <div className={className}>
        <label className={textInputStyle + ' ' + labelStyle}>
          {label}
          <label className={descriptionStyle}>{description}</label>
          <div className={inputContainerStyle}>
            <input
              className={inputStyle}
              type="text"
              value={value}
              required={!optional}
              disabled={disabled}
              placeholder={placeholder}
              onChange={e => onValueChange(e)}
              ref={forwardRef}
            />
            <Icon
              glyph="Checkmark"
              className={cx(validIconStyle, {
                [css('display: none')]: state != State.valid,
              })}
            />
            <Icon
              glyph="Warning"
              className={cx(errorIconStyle, {
                [css('display: none')]: state != State.error,
              })}
            />
            <div
              className={cx(optionalStyle, {
                [css('display: none')]: state != State.none || !optional,
              })}
            >
              <p>Optional</p>
            </div>
          </div>
          <div className={errorMessageStyle}>
            <label>{errorMessage}</label>
          </div>
        </label>
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  state: PropTypes.oneOf(Object.values(State)),
  value: PropTypes.string,
  setValue: PropTypes.func,
  className: PropTypes.string,
};

export default TextInput;
