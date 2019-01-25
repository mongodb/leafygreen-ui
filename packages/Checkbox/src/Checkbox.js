import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ccClassName, emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';
import {
  spritesheetLight,
  spritesheetDark,
  disabledLight,
  disabledDark,
  indeterminateLight,
  indeterminateDark,
} from './img';

const { css } = emotion;

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

  &:checked:not(:indeterminate):not(:disabled) + .${wrapperStyle} {
    opacity: 1;

    & > .${checkboxStyle} {
      transition: 500ms transform steps(29);
      transform: translate3d(${-width + height}px, 0, 0);
    }
  }

  &:focus + .${wrapperStyle}:after {
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

const checkboxVariants = {
  default: css`
    background-image: url(${spritesheetDark});

    .${inputStyle}:indeterminate:not(:disabled) + .${wrapperStyle} > & {
      background-image: url(${indeterminateDark});
    }

    .${inputStyle}:disabled + .${wrapperStyle} > & {
      background-image: url(${disabledDark});
    }
  `,

  light: css`
    background-image: url(${spritesheetLight});

    .${inputStyle}:indeterminate:not(:disabled) + .${wrapperStyle} > & {
      background-image: url(${indeterminateLight});
    }

    .${inputStyle}:disabled + .${wrapperStyle} > & {
      background-image: url(${disabledLight});
    }
  `,
};

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

  &:hover > .${wrapperStyle} {
    opacity: 1;
  }

  /* Use [disabled] instead of &:disabled as this isn't an input element */
  &[disabled] {
    cursor: not-allowed;

    & > .${textStyle} {
      color: ${colors.gray[5]};
    }
  }
`;

export default class Checkbox extends PureComponent {
  static displayName = 'Button';
  static checkboxId = `checkbox-${Math.floor(Math.random() * 10000000)}`;

  static defaultProps = {
    variant: 'default',
    checked: false,
    label: '',
    disabled: false,
    indeterminate: false,
    className: '',
  };

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    checked: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    className: PropTypes.string,
  };

  componentDidMount() {
    this.input.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.indeterminate !== this.props.indeterminate) {
      this.input.indeterminate = this.props.indeterminate;
    }
  }

  render() {
    const labelId = `${this.checkboxId}-label`;
    const {
      name = `${this.checkboxId}`,
      checked,
      className,
      label,
      variant,
      disabled,
      ...rest
    } = this.props;

    const checkboxVariantStyle =
      checkboxVariants[variant] || checkboxVariants.default;
    const textVariantStyle = textVariants[variant] || textVariants.default;

    // Indeterminate isn't a valid HTML prop
    delete rest.indeterminate;

    return (
      <label
        className={ccClassName(className, containerStyle)}
        htmlFor={this.checkboxId}
        disabled={disabled}
      >
        <input
          {...rest}
          id={this.checkboxId}
          ref={el => (this.input = el)}
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
        />

        <div className={wrapperStyle}>
          <div className={ccClassName(checkboxStyle, checkboxVariantStyle)} />
        </div>

        <span className={ccClassName(textStyle, textVariantStyle)} id={labelId}>
          {label}
        </span>
      </label>
    );
  }

  onClick = e => {
    const { onClick, onChange } = this.props;

    onClick();

    // For Microsoft Edge and IE, when checkbox is indeterminate, change event does not fire when clicked.
    // Explicitly call onChange for this case
    if (this.el && this.el.indeterminate) {
      onChange(e);
      e.stopPropagation();
    }
  };
}
