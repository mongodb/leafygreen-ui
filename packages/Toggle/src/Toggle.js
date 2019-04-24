import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createDataProp, emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css, cx } = emotion;

const toggleInput = createDataProp('toggle-input');
const toggleGroove = createDataProp('toggle-groove');

const transitionInMS = 150;

const inputStyle = css`
  margin: 0;
  position: absolute;
  left: 100%;
  top: 100%;
  pointer-events: none;
  opacity: 0;
`;

// We use a div for the focus state rather than a pseudo-element
// because said pseudo-element would need to be on the label element
// which can't use the contained input's focus pseudo-class.
const focusStateStyle = css`
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: -2px;
  bottom: -2px;
  left: -2px;
  right: -2px;
  border: 2px solid rgba(67, 177, 229, 0.25);
  border-radius: 50px;
  opacity: 0;
  transform: scale(0.8);

  ${toggleInput.selector}:focus ~ & {
    opacity: 1;
    transform: scale(1);
  }
`;

const labelStyleBase = `
  transition: all ${transitionInMS}ms ease-in-out;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  height: 11px;
  line-height: 11px;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 11px;
  color: white;
  user-select: none;
`;

const onLabelStyle = css`
  ${labelStyleBase};
  left: 9px;
  color: #bbebff;

  ${toggleInput.selector}:hover ~ ${toggleGroove.selector} > &,
  ${toggleInput.selector}:focus ~ ${toggleGroove.selector} > & {
    color: white;
  }
`;

const offLabelStyle = css`
  ${labelStyleBase};
  right: 6px;
  color: #9fa1a2;
`;

const getStatefulContainerStyles = ({ size, disabled }) => {
  const baseStyle = css`
    position: relative;
    display: inline-block;
    cursor: ${disabled ? 'not-allowed' : 'pointer'};
  `;

  const sizeStyle = {
    default: css`
      height: 32px;
      width: 62px;
    `,

    small: css`
      height: 22px;
      width: 40px;
    `,

    xsmall: css`
      height: 14px;
      width: 26px;
    `,
  };

  return css`
    ${baseStyle} ${sizeStyle[size]}
  `;
};

const getStatefulGrooveStyles = ({ variant, checked, disabled }) => {
  const baseStyles = `
    transition: ${transitionInMS}ms all ease-in-out, 0 background-color linear;
    display: inline-block;
    overflow: hidden;
    flex-shrink: 0;
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border: 1px solid;

    // We're animating this pseudo-element in order to give the toggle groove
    // background an animation in and out.
    &:before {
      content: '';
      transition: ${transitionInMS}ms all ease-in-out;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: 50px;
      background-color: ${colors.mongodb.blue};
      box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
      opacity: 0;
      transform: scale(0.85);
    }

    ${
      disabled
        ? `
      &:before {
        opacity: 0;
      }
    `
        : ''
    }

    ${
      checked && !disabled
        ? `
      // We set background-color here to avoid a small issue with overflow clipping
      // that makes this look less seamless than it should.
      background-color: ${colors.mongodb.blue};
      border-color: #2e9ed3;
      transition-delay: ${transitionInMS}ms;

      &:before {
        transform: scale(1);
        opacity: 1;
      }
    `
        : ''
    }
  `;

  const variants = {
    default: css`
      ${disabled
        ? `
        background-color: rgba(29, 36, 36, 0.1);
        border-color: rgba(18, 22, 22, 0.05);
      `
        : `
        box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      `}

      ${!checked && !disabled
        ? `
        background-color: rgba(29, 36, 36, 0.08);
        border-color: rgba(0, 0, 0, 0.03);
      `
        : ''}
    `,

    dark: css`
      ${disabled
        ? `
        background-color: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.1);
      `
        : `
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.15);
      `}

      ${!checked && !disabled
        ? `
        background-color: rgba(29, 36, 36, 0.6);
        border-color: rgba(18, 22, 22, 0.1);
      `
        : ''}
    `,
  };

  return css`
    ${baseStyles} ${variants[variant]}
  `;
};

const getStatefulSliderStyles = ({ size, variant, checked, disabled }) => {
  const transformBySize = {
    default: 30,
    small: 18,
    xsmall: 12,
  };

  const sizes = disabled
    ? {
        default: 28,
        small: 18,
        xsmall: 10,
      }
    : {
        default: 28,
        small: 20,
        xsmall: 12,
      };

  const baseStyles = `
    transition: all ${transitionInMS}ms ease-in-out;
    border-radius: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow: hidden;
    height: ${sizes[size]}px;
    width: ${sizes[size]}px;
    transform: translate3d(${checked ? transformBySize[size] : 0}px, 0, 0);

    ${
      disabled
        ? `
      left: 1px;

      &:before,
      &:after {
        display: none;
      }
    `
        : `
      left: ${size === 'default' ? 1 : 0}px;

      &:before,
      &:after {
        content: '';
        transition: opacity ${transitionInMS}ms ease-in-out;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      &:before {
        opacity: 1;
      }

      &:after {
        opacity: 0;
        background-image: linear-gradient(
          rgba(220, 220, 220, 0),
          rgba(220, 220, 220, 0.5)
        );
      }
    `
    }
  `;

  const sliderVariants = {
    default: `
      &:before {
        background-image: linear-gradient(
          rgba(220, 220, 220, 0),
          rgba(220, 220, 220, 0.5)
        );
      }

      ${
        disabled
          ? `
        background-color: rgba(0, 0, 0, 0.08);
      `
          : `
        background-color: white;
        box-shadow:
          0 0 2px rgba(0, 0, 0, 0.08),
          0 1px 2px rgba(0, 0, 0, 0.25),
          inset 0 -1px 0 #f1f1f1;
      `
      }
    `,

    dark: `
      ${
        disabled
          ? `
        background-color: rgba(255, 255, 255, 0.15);
        background-image: none;
      `
          : `
        background-color: #6f767b;
        box-shadow:
          0 0 2px rgba(0, 0, 0, 0.15),
          0 1px 2px rgba(0, 0, 0, 0.25),
          inset 0 -1px 0 #454d53;
      `
      }

      ${
        !disabled && checked
          ? `
        background-color: white;
        box-shadow:
          0 0 2px rgba(0, 0, 0, 0.08),
          0 1px 2px rgba(0, 0, 0, 0.25),
          inset 0 -1px 0 #f1f1f1;

        &:before {
          opacity: 0;
        }

        &:after {
          opacity: 1;
        }
      `
          : ''
      }
    `,
  };

  return css`
    ${baseStyles} ${sliderVariants[variant]}
  `;
};

const getStatefulStyles = states => ({
  slider: getStatefulSliderStyles(states),
  groove: getStatefulGrooveStyles(states),
  container: getStatefulContainerStyles(states),
});

export default class Toggle extends PureComponent {
  static displayName = 'Toggle';

  static propTypes = {
    size: PropTypes.oneOf(['default', 'small', 'xsmall']),
    variant: PropTypes.oneOf(['default', 'dark']),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
  };

  static defaultProps = {
    size: 'default',
    variant: 'default',
    disabled: false,
    className: '',
    onChange: () => {},
  };

  state = { checked: false };
  checkboxId = `toggle-${Math.floor(Math.random() * 10000000)}`;

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
    const {
      name = this.checkboxId,
      checked = this.state.checked,
      className,
      label,
      disabled,
      size,
      variant,
      ...rest
    } = this.props;

    const statefulStyles = getStatefulStyles({
      checked,
      disabled,
      size,
      variant,
    });

    return (
      <label
        className={cx(statefulStyles.container, className)}
        htmlFor={this.checkboxId}
      >
        <input
          {...toggleInput.prop}
          {...rest}
          id={this.checkboxId}
          className={inputStyle}
          type="checkbox"
          role="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          aria-disabled={disabled}
          aria-checked={checked}
          onChange={this.onChange}
        />

        <div className={focusStateStyle} />

        <div {...toggleGroove.prop} className={statefulStyles.groove}>
          {size === 'default' && !disabled && (
            <>
              <div className={onLabelStyle}>On</div>
              <div className={offLabelStyle}>Off</div>
            </>
          )}

          <div className={statefulStyles.slider} />
        </div>
      </label>
    );
  }
}
