import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
// import Icon from '@leafygreen-ui/icon';

interface TextInputProps {
  label?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  placeholderText?: string;
  validateInput?: React.ChangeEventHandler<HTMLInputElement>;
  errorMessage?: string;
  isValid?: boolean;
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
    validateInput: PropTypes.func,
    errorMessage: PropTypes.string,
    isValid: PropTypes.bool,
  };

  static defaultProps = {
    label: '',
    description: '',
    optional: false,
    disabled: false,
    placeholderText: '',
    validateInput: null,
    errorMessage: '',
    isValid: true,
  };

  render() {
    const {
      label,
      description,
      optional,
      disabled,
      placeholderText,
      errorMessage,
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

    const inputStyle = css`
      width: 400px;
      height: 36px;
      border-radius: 4px;
      border: 1px solid #ccc;
      padding-left: 12px;
      background: ${disabled ? '#E7EEEC' : '#FFFFFF'};
    `;

    const errorStyle = css`
      color: #cf4a22;
      font-size: 14px;
      height: 20px;
      align-items: center;
      padding-top: 4px;
    `;

    //   const validStyle = css`
    //   color: #13AA52;
    // `;

    return (
      <div className={textInputStyle}>
        <label className={labelStyle}>{label}</label>
        <label className={descriptionStyle}>{description}</label>
        <input
          className={inputStyle}
          type="text"
          required={!optional}
          disabled={disabled}
          placeholder={placeholderText}
        />
        <div hidden={isValid} className={errorStyle}>
          {/* <Icon glyph='Warning' /> */}
          <label>{errorMessage}</label>
        </div>
      </div>
    );
  }
}
