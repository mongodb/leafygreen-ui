import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createDataProp, IdAllocator } from '@leafygreen-ui/lib';
import { css, cx } from '@leafygreen-ui/emotion';
import { colors } from '@leafygreen-ui/theme';
import {
  spritesheetLight,
  spritesheetDark,
  disabledLight,
  disabledLightChecked,
  disabledDark,
  disabledDarkChecked,
  indeterminateLight,
  indeterminateDark,
} from './img';

const checkboxWrapper = createDataProp('checkbox-wrapper');

const height = 20;
const width = 600;

export const Variant = {
  Default: 'default',
  Light: 'light',
} as const;

export type Variant = typeof Variant[keyof typeof Variant];

const wrapperStyleAnimated = css`
  transition: 300ms opacity ease-in-out;
`;

const wrapperStyle = css`
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
  height: 0;
  width: 0;
  left: 0;
  top: 0;
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

const checkboxStyleAnimated = css`
  transition: 500ms transform steps(29);
`;

const checkboxStyleChecked = css`
  transform: translate3d(${-width + height}px, 0, 0);
`;

const textVariants: { [K in Variant]: string } = {
  default: css`
    color: ${colors.gray[1]};
  `,

  light: css`
    color: ${colors.gray[8]};
  `,
};

const baseTextStyle = css`
  margin-left: 3px;
  font-size: 14px;
  line-height: 1.3em;
  flex-grow: 1;
  position: relative;
  top: 2px;
`;

const boldTextStyle = css`
  font-weight: bold;
  top: 1px;
`;

const containerStyle = css`
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  cursor: pointer;

  &:hover > ${checkboxWrapper.selector} {
    opacity: 1;
  }
`;

/** &:disabled won't work and [disabled] isn't a valid property because this isn't an input */
const disabledContainerStyle = css`
  cursor: not-allowed;
`;

const disabledTextStyle = css`
  color: ${colors.gray[5]};
`;

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant: Variant;
  checked?: boolean;
  label: React.ReactNode;
  disabled: boolean;
  indeterminate: boolean;
  className: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  bold: boolean;
  animate?: boolean;
}

export default class Checkbox extends Component<
  CheckboxProps & React.InputHTMLAttributes<HTMLInputElement>
> {
  static displayName = 'Checkbox';

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    checked: PropTypes.bool,
    label: PropTypes.node,
    disabled: PropTypes.bool,
    indeterminate: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    bold: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    animate: PropTypes.bool,
  };

  static defaultProps = {
    variant: 'default',
    label: '',
    disabled: false,
    indeterminate: false,
    className: '',
    onChange: () => {},
    bold: false,
  };

  state = { checked: false };

  componentDidMount() {
    this.inputRef.current!.indeterminate = this.props.indeterminate;
  }

  componentDidUpdate(prevProps: CheckboxProps) {
    if (
      prevProps.indeterminate !== this.props.indeterminate &&
      this.inputRef.current != null
    ) {
      this.inputRef.current.indeterminate = this.props.indeterminate;
    }
  }

  private static idAllocator = IdAllocator.create('checkbox');
  private _defaultCheckboxId?: string;

  private get defaultCheckboxId(): string {
    if (!this._defaultCheckboxId) {
      this._defaultCheckboxId = Checkbox.idAllocator.generate();
    }

    return this._defaultCheckboxId;
  }

  inputRef = React.createRef<HTMLInputElement>();

  onClick = (
    e: React.MouseEvent<HTMLInputElement> & { target: HTMLInputElement },
  ) => {
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

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange, checked } = this.props;

    if (onChange) {
      onChange(e);
    }

    if (checked == null) {
      this.setState({ checked: e.target.checked });
    }
  };

  render() {
    const checkboxId = this.props.id || this.defaultCheckboxId;
    const labelId = `${checkboxId}-label`;

    const {
      name = checkboxId,
      checked = this.state.checked,
      animate = true,
      className,
      style,
      label,
      variant,
      disabled,
      indeterminate,
      bold,
      ...rest
    } = this.props;

    const textVariantStyle =
      textVariants[variant] || textVariants[Variant.Default];

    const checkboxBackgroundImage = (() => {
      switch (variant) {
        case 'light': {
          if (disabled) {
            if (checked) {
              return css`
                background-image: url(${disabledLightChecked});
              `;
            }

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
            if (checked) {
              return css`
                background-image: url(${disabledDarkChecked});
              `;
            }

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
        className={cx(containerStyle, className, {
          [disabledContainerStyle]: disabled,
        })}
        style={style}
        htmlFor={checkboxId}
        id={labelId}
      >
        <input
          {...rest}
          id={checkboxId}
          ref={this.inputRef}
          className={inputStyle}
          type="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          aria-label="checkbox"
          aria-disabled={disabled}
          aria-checked={indeterminate ? 'mixed' : checked}
          aria-labelledby={labelId}
          onClick={this.onClick}
          onChange={this.onChange}
        />

        <div
          {...checkboxWrapper.prop}
          className={cx(wrapperStyle, {
            [wrapperStyleChecked]: checked && !indeterminate && !disabled,
            [wrapperStyleAnimated]: animate && !indeterminate && !disabled,
          })}
        >
          <div
            className={cx(checkboxStyle, checkboxBackgroundImage, {
              [checkboxStyleChecked]: checked && !indeterminate && !disabled,
              [checkboxStyleAnimated]: animate && !indeterminate && !disabled,
            })}
          />
        </div>

        {label && (
          <span
            className={cx(baseTextStyle, textVariantStyle, {
              [disabledTextStyle]: disabled,
              [boldTextStyle]: bold,
            })}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
}
