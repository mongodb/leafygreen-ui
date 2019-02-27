import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const groupVariants = {
  default: css`
    &[disabled] {
      color: ${colors.gray[5]};
    }
  `,

  light: css`
    &[disabled] {
      color: ${colors.gray[8]};
    }
  `,
};

const baseLabelStyle = css`
  cursor: pointer;
  margin-bottom: 5px;

  &[disabled] {
    cursor: not-allowed;
  }
`;

const baseInputStyle = css`
  margin-right: 0.5em;

  &:disabled {
    cursor: not-allowed;
  }
`;

const textStyle = css`
  line-height: 0.9em;
`;

export default class RadioButton extends PureComponent {
  static displayName = 'RadioButton';

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

    const radioButtonVariantStyle =
      groupVariants[variant] || groupVariants.default;
    return (
      <label
        htmlFor={id}
        className={ccClassName(
          css`
            ${baseLabelStyle} ${radioButtonVariantStyle}
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
              ${baseInputStyle}
            `,
            className,
          )}
          onChange={onChange}
          value={value}
          checked={checked}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
        />

        <span className={textStyle}>{children}</span>
      </label>
    );
  }
}
