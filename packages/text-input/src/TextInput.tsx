import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

interface TextInputProps {
  label?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  validateInput?: Function;
  placeholderText?: string;
  errorMessage?: string;
  className?: string;
}

function TextInput({
  label,
  description,
  optional,
  disabled,
  validateInput,
  placeholderText,
  errorMessage,
  className,
}: TextInputProps) {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(true);

  function getColorFromValidationState() {
    if (validateInput == undefined) {
      return '#CCC';
    } else {
      return valid ? '#13AA52' : '#CF4A22';
    }
  }

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (validateInput != undefined) {
      setValid(validateInput(e.target.value));
    }
    setValue(e.target.value);
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
    color: ${valid ? '#13AA52' : '#CF4A22'};
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
          placeholder={placeholderText}
          onChange={e => onValueChange(e)}
        />
        <div hidden={validateInput == undefined} className={iconStyle}>
          <Icon glyph={valid ? 'Checkmark' : 'Warning'} />
        </div>
        <div hidden={!optional} className={optionalStyle}>
          <p>Optional</p>
        </div>
      </div>
      <div hidden={validateInput == undefined || valid} className={errorStyle}>
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
  validateInput: PropTypes.func,
  placeholderText: PropTypes.string,
  errorMessage: PropTypes.string,
};

export default TextInput;
