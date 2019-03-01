import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const labelStyle = css`
  cursor: pointer;
  margin-bottom: 5px;
  display: block;
`;

const inputStyle = css`
  margin-right: 0.5em;

  &:disabled {
    cursor: not-allowed;
  }
`;

const buttonVariants = {
  default: css`
    .${inputStyle}:disabled + & {
      color: ${colors.gray[5]};
    }
  `,

  light: css`
    .${inputStyle}:disabled + & {
      color: ${colors.gray[4]};
    }
  `,
};

const textStyle = css`
  line-height: 0.9em;
`;

export default class Radio extends PureComponent {
  static displayName = 'Radio';

  static defaultProps = {
    checked: false,
    disabled: false,
    className: '',
    onChange: () => {},
    variant: 'default',
  };

  static propTypes = {
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    id: PropTypes.string,
    name: PropTypes.string,
    variant: PropTypes.oneOf(['default', 'light']),
  };

  render() {
    const {
      children,
      className,
      onChange,
      value,
      checked,
      disabled,
      id,
      name,
      variant,
      ...rest
    } = this.props;

    const variantStyle = buttonVariants[variant];

    return (
      <label htmlFor={id} className={ccClassName(labelStyle, className)}>
        <input
          {...rest}
          id={id}
          name={name}
          type="radio"
          className={ccClassName(inputStyle, className)}
          onChange={onChange}
          value={value}
          checked={checked}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
        />

        <span
          className={css`
            ${textStyle} ${variantStyle}
          `}
        >
          {children}
        </span>
      </label>
    );
  }
}
