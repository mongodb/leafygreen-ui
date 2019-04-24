import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { emotion, createDataProp } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import {
  spritesheetLight,
  spritesheetDark,
  disabledLight,
  disabledDark,
  indeterminateLight,
  indeterminateDark,
} from './img';

const { css, cx } = emotion;

const checkboxWrapper = createDataProp('checkbox-wrapper');

const height = 20;
const width = 600;

const wrapperStyle = css`
  transition: 300ms opacity ease-in-out;
  height: ${height}px;
  width: ${height}px;
  display: inline-block;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  opacity: 0.9;
`;

const checkboxStyle = css`
  height: ${height}px;
  width: ${width}px;
  background-size: contain;
  background-repeat: no-repeat;
`;

const inputStyle = css`
  margin: 0;
  position: absolute;
  left: 100%;
  top: 100%;
  pointer-events: none;
  opacity: 0;

  &:focus + ${checkboxWrapper.selector}:after {
    content: '';
    bottom: 0;
    left: 3px;
    right: 3px;
    height: 2px;
    position: absolute;
    background-color: #43b1e5;
    border-radius: 2px;
  }
`;

const wrapperStyleChecked = css`
  opacity: 1;
`;

const checkboxStyleChecked = css`
  transition: 500ms transform steps(29);
  transform: translate3d(${-width + height}px, 0, 0);
`;

const textVariants = {
  default: css`
    color: ${colors.gray[1]};
  `,

  light: css`
    color: ${colors.gray[8]};
  `,
};

const textStyle = css`
  margin-left: 0.3em;
  font-size: 14px;
  font-weight: bold;
  line-height: 1.3em;
  margin-top: 1px;
`;

const containerStyle = css`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;

  &:hover > ${checkboxWrapper.selector} {
    opacity: 1;
  }

  /* Use [disabled] instead of &:disabled as this isn't an input element */
  &[disabled] {
    cursor: not-allowed;
  }
`;

const disabledTextStyle = css`
  color: ${colors.gray[5]};
`;

export default class Checkbox extends PureComponent {
  static displayName = 'Checkbox';

  static defaultProps = {
    variant: 'default',
    label: '',
    disabled: false,
    indeterminate: false,
    className: '',
    onChange: () => {},
  };

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    checked: PropTypes.bool,
    label: PropTypes.node,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = { checked: false };

  componentDidMount() {
    this.inputRef.current.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.inputRef.current.indeterminate = this.props.indeterminate;
    }
  }

  inputRef = React.createRef();
  checkboxId = `checkbox-${Math.floor(Math.random() * 10000000)}`;

  onClick = e => {
    const { onClick } = this.props;

    if (onClick) {
      onClick(e);
    }

    // For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
    // Explicitly call onChange for this case
    if (this.inputRef.current && this.inputRef.current.indeterminate) {
      this.onChange(e);
      e.stopPropagation();
    }
  };

  onChange = e => {
    const { onChange, checked } = this.props;

    if (onChange) {
      onChange(e);
    }

    if (checked == null) {
      this.setState({ checked: e.target.checked });
    }
  };

  render() {
    const labelId = `${this.checkboxId}-label`;
    const {
      name = `${this.checkboxId}`,
      checked = this.state.checked,
      className,
      label,
      variant,
      disabled,
      indeterminate,
      ...rest
    } = this.props;

    const textVariantStyle = textVariants[variant] || textVariants.default;

    // Indeterminate isn't a valid HTML prop
    delete rest.indeterminate;

    const checkboxBackgroundImage = (() => {
      switch (variant) {
        case 'light': {
          if (disabled) {
            return css`
              background-image: url(${disabledLight});
            `;
          }

          if (indeterminate) {
            return css`
              background-image: url(${indeterminateLight});
            `;
          }

          return css`
            background-image: url(${spritesheetLight});
          `;
        }
        default: {
          if (disabled) {
            return css`
              background-image: url(${disabledDark});
            `;
          }

          if (indeterminate) {
            return css`
              background-image: url(${indeterminateDark});
            `;
          }

          return css`
            background-image: url(${spritesheetDark});
          `;
        }
      }
    })();

    return (
      <label
        className={cx(containerStyle, className)}
        htmlFor={this.checkboxId}
        disabled={disabled}
      >
        <input
          {...rest}
          id={this.checkboxId}
          ref={this.inputRef}
          className={inputStyle}
          type="checkbox"
          role="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          aria-disabled={disabled}
          aria-checked={checked}
          aria-labelledby={labelId}
          onClick={this.onClick}
          onChange={this.onChange}
        />

        <div
          {...checkboxWrapper.prop}
          className={cx(wrapperStyle, {
            [wrapperStyleChecked]: checked && !indeterminate && !disabled,
          })}
        >
          <div
            className={cx(checkboxStyle, checkboxBackgroundImage, {
              [checkboxStyleChecked]: checked && !indeterminate && !disabled,
            })}
          />
        </div>

        {label && (
          <span
            className={cx(textStyle, textVariantStyle, {
              [disabledTextStyle]: disabled,
            })}
            id={labelId}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
}
