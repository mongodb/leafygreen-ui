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
    variant: 'default',
  };

  static propTypes = {
    label: PropTypes.node.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'green']),
    id: PropTypes.string,
    name: PropTypes.string,
  };

  render() {
    const {
      label,
      className,
      onChange,
      value,
      checked,
      disabled,
      id,
      name,
      variant,
      size,
      ...rest
    } = this.props;

    let checkedStyle;
    checked
      ? (checkedStyle = style.checkedVariant.checked)
      : (checkedStyle = null);

    const richRadioSize =
      style.richRadioInputSizeVaraints[size] ||
      style.richRadioInputSizeVaraints.medium;

    const richRadioVariant = style.richRadioInputStyleVariants[variant] || null;

    return (
      <label
        htmlFor={id}
        className={ccClassName(
          style.baseLabelStyle,
          checkedStyle,
          richRadioSize,
        )}
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
          className={ccClassName(style.baseInputStyle, richRadioVariant)}
        />

        <div
          className={ccClassName(
            css`
              ${style.baseTextStyle}
            `,
          )}
        >
          {label}
        </div>
      </label>
    );
  }
}
