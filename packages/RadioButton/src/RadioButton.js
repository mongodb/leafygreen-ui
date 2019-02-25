import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const labelStyle = css`
  font-size: 12px;
  color: ${colors.gray[2]};
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  cursor: pointer;

  &[disabled] {
    cursor: not-allowed;
    color: ${colors.gray[5]};
  }
`;

const baseStyle = css`
  &:disabled {
    cursor: not-allowed;
  }
`;

const spanStyle = css`
  line-height: 0.9em;
`;
export default class RadioButton extends Component {
  static displayName = 'RadioButton';

  static defaultProps = {
    checked: false,
    disabled: false,
    className: '',
    children: null,
    onChange: () => {},
    value: '',
    id: '',
    name: '',
  };

  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
  };

  render() {
    const {
      children,
      className,
      handleChange,
      value,
      checked,
      disabled,
      id,
      name,
      ...rest
    } = this.props;

    return (
      <label
        htmlFor={id}
        disabled={disabled}
        aria-disabled={disabled}
        className={ccClassName(
          css`
            ${labelStyle}
          `,
          className,
        )}
      >
        <input
          {...rest}
          id={id}
          name={name}
          type="radio"
          className={ccClassName(
            css`
              ${baseStyle}
            `,
            className,
          )}
          onChange={handleChange}
          value={value}
          checked={checked}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
        />

        <span className={spanStyle}>{children}</span>
      </label>
    );
  }
}
