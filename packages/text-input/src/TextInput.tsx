import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';

interface TextInputProps {
  label?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  validationOccurred?: boolean;
  isValid?: boolean;
  placeholderText?: string;
  errorMessage?: string;
  onFocus?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.ChangeEventHandler<HTMLInputElement>;
}

export default class TextInput extends PureComponent<
  TextInputProps & React.InputHTMLAttributes<HTMLInputElement>
  > {
  static displayName = 'TextInput';

  static propTypes = {
    label: PropTypes.string,
    description: PropTypes.string,
    optional: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholderText: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    errorMessage: PropTypes.string,
    validationOccurred: PropTypes.bool,
    isValid: PropTypes.bool,
  };

  static defaultProps = {
    label: '',
    description: '',
    optional: false,
    disabled: false,
    placeholderText: '',
    onFocus: null,
    onBlur: null,
    errorMessage: '',
    validationOccurred: false,
    isValid: true,
  };

  getColorFromValidationState() {
    if(!this.props.validationOccurred) {
      return '#CCC';
    } else {
      return this.props.isValid ? '#13AA52' : '#CF4A22';
    }
  }

  render() {
    const {
      label,
      description,
      optional,
      disabled,
      placeholderText,
      onFocus,
      onBlur,
      errorMessage,
      validationOccurred,
      isValid,
    } = this.props;

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
      border: 1px solid ${this.getColorFromValidationState()};
      padding-left: 12px;
      background: ${disabled ? '#E7EEEC' : '#FFFFFF'};
    `;

    const iconStyle = css`
      position: absolute;
      right: 10px;
      color: ${isValid ? '#13AA52' : '#CF4A22'};
    `;

    const optionalStyle = css`
      position: absolute;
      right: 12px;
      color: #5D6C74;
      font-size: 12px;
      font-style: italic;
    `;

    const errorStyle = css`
      color: #CF4A22;
      font-size: 14px;
      height: 20px;
      padding-top: 4px;
    `;

    return (
      <div className={textInputStyle}>
        <label className={labelStyle}>{label}</label>
        <label className={descriptionStyle}>{description}</label>
        <div className={inputContainerStyle}>
          <input
            className={inputStyle}
            type='text'
            required={!optional}
            disabled={disabled}
            placeholder={placeholderText}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <div hidden={!validationOccurred} className={iconStyle}>
            <Icon glyph={isValid ? 'Checkmark' : 'Warning'} />
          </div>
          <div hidden={!optional || validationOccurred} className={optionalStyle}>
            <label>Optional</label>
          </div>    
        </div>
        <div hidden={!validationOccurred || isValid} className={errorStyle}>
          <label>{errorMessage}</label>
        </div>
      </div>
    );
  }
}
