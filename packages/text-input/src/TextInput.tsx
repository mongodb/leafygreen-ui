import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

export const State = {
  none: 'none',
  valid: 'valid',
  error: 'error',
} as const;

export type State = typeof State[keyof typeof State];

interface TextInputProps {
  value?: string;
  label?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  onChange?: Function;
  placeholder?: string;
  errorMessage?: string;
  state?: State;
  className?: string;
}

// TODO: controlled/uncontrolled component logic
const TextInput = React.forwardRef(
  (
    {
      value,
      label,
      description,
      optional = false,
      disabled = false,
      onChange,
      placeholder,
      errorMessage,
      state = State.none,
      className,
    }: TextInputProps,
    forwardRef: React.Ref<HTMLInputElement>,
  ) => {
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
      value = e.target.value;
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
      display: ${state == State.error ? '' : 'none'};
    `;

    const validIconStyle = css`
      position: absolute;
      right: 10px;
      color: #13aa52;
      display: ${state == State.valid ? '' : 'none'};
    `;

    const optionalStyle = css`
      position: absolute;
      right: 12px;
      color: #5d6c74;
      font-size: 12px;
      font-style: italic;
      font-weight: normal;
      display: ${!optional || state != State.none ? 'none' : ''};
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
            <Icon glyph="Checkmark" className={validIconStyle} />
            <Icon glyph="Warning" className={errorIconStyle} />
            <div className={optionalStyle}>
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
  className: PropTypes.string,
};

export default TextInput;
