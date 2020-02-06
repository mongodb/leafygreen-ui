import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { css } from '@leafygreen-ui/emotion';
// import Icon from '@leafygreen-ui/icon';

interface TextInputProps {
  label?: string;
  description?: string;
  optional?: boolean;
  disabled?: boolean;
  placeholder?: string;
  errorMessage?: string;
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
    placeholder: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static defaultProps = {
    label: '',
    description: '',
    optional: false,
    disabled: false,
    placeholder: '',
    errorMessage: '',
  };

  render() {
    const {
      label,
      description,
      optional,
      disabled,
      placeholder,
      errorMessage,
    } = this.props;

    const textInputStyle = css`
      display: grid;
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
      width: 300px;
      height: 36px;
      border-radius: 4px;
      border: 1px solid #ccc;
      padding-left: 12px;
    `;

    const errorStyle = css`
      color: #cf4a22;
      font-size: 14px;
      height: ${errorMessage === '' ? '0' : '20'}px;
      padding-top: 6px;
    `;

    return (
      <div className={textInputStyle}>
        <label className={labelStyle}>{label}</label>
        <label className={descriptionStyle}>{description}</label>
        <input
          className={inputStyle}
          type="text"
          required={!optional}
          disabled={disabled}
          placeholder={placeholder}
        />
        {/* <Icon glyph='Error'/> */}
        <label className={errorStyle}>{errorMessage}</label>
      </div>
    );
  }
}
