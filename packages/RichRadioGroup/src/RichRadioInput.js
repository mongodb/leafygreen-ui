import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as style from './style.js';

import { ccClassName, emotion } from '@leafygreen-ui/lib';
const { css } = emotion;

export default class RichRadioInput extends Component {
  static displayName = 'RichRadioInput';

  static defaultProps = {
    onChange: () => {},
    checked: false,
    disabled: false,
    className: '',
  };

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'green']),
    id: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.node,
  };

  render() {
    const {
      className,
      onChange,
      value,
      checked,
      disabled,
      id,
      name,
      variant,
      size,
      children,
      ...rest
    } = this.props;

    const richRadioSize = style.richRadioInputSizeVaraints[size];
    const checkedStyle =
      checked &&
      (variant === 'green'
        ? ccClassName(
            style.checkedVariants.green,
            style.checkedVariants.default,
          )
        : style.checkedVariants.default);

    return (
      <label
        htmlFor={id}
        disabled={disabled}
        className={ccClassName(style.container, richRadioSize, checkedStyle)}
      >
        <input
          {...rest}
          type="radio"
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          checked={checked}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
          className={ccClassName(style.baseInputStyle)}
        />

        {/* <div className={ccClassName(style.wrapperStyle, richRadioSize)} /> */}

        <div className={ccClassName(style.baseTextStyle)}>{children}</div>
      </label>
    );
  }
}
