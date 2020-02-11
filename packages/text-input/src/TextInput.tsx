import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

interface TextInputProps {
  value?: string;
  label?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  onChange?: Function;
  placeholder?: string;
  errorMessage?: string;
  state?: 'none' | 'valid' | 'error';
  className?: string;
}

// TODO: controlled/uncontrolled component logic
function TextInput({
  value,
  label,
  description,
  optional,
  disabled,
  onChange,
  placeholder,
  errorMessage,
  state,
  className,
}: TextInputProps) {
  function getColorFromValidationState() {
    if (onChange == undefined) {
      return '#CCC';
    } else {
      return state == 'valid' ? '#13AA52' : '#CF4A22';
    }
  }

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (onChange != undefined) {
      onChange(e.target.value);
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
  `;

  const descriptionStyle = css`
    color: #5d6c74;
    font-size: 14px;
    height: ${description === '' ? '0' : '20'}px;
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
    &: placeholder {
      color: #89989b;
    }
  `;

  const iconStyle = css`
    position: absolute;
    right: 10px;
    color: ${state == 'valid' ? '#13AA52' : '#CF4A22'};
  `;

  const optionalStyle = css`
    position: absolute;
    right: 12px;
    color: #5d6c74;
    font-size: 12px;
    font-style: italic;
  `;

  const errorStyle = css`
    color: #cf4a22;
    font-size: 14px;
    height: 20px;
    padding-top: 4px;
  `;

  return (
    <div className={textInputStyle + ' ' + className}>
      <label className={labelStyle}>{label}</label>
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
        />
        <div hidden={state != 'valid'} className={iconStyle}>
          <Icon glyph="Checkmark" />
        </div>
        <div hidden={state != 'error'} className={iconStyle}>
          <Icon glyph="Warning" />
        </div>
        <div hidden={!optional && state == 'none'} className={optionalStyle}>
          <p>Optional</p>
        </div>
      </div>
      <div hidden={state != 'error'} className={errorStyle}>
        <label>{errorMessage}</label>
      </div>
    </div>
  );
}

TextInput.displayName = 'TextInput';

TextInput.propTypes = {
  label: PropTypes.string,
  description: PropTypes.string,
  optional: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  errorMessage: PropTypes.string,
  state: PropTypes.string,
  className: PropTypes.string,
};

export default TextInput;
