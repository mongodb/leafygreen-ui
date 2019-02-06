import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ccClassName, emotion } from '@leafygreen-ui/lib';
import { colors } from '@leafygreen-ui/theme';

const { css } = emotion;

const transitionInMS = 150

const inputStyle = css`
  margin: 0;
  position: absolute;
  left: 100%;
  top: 100%;
  pointer-events: none;
  opacity: 0;
`;

const grooveStyle = css`
  transition: ${transitionInMS}ms all ease-in-out, 0 background-color linear;
  display: inline-block;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  
  // We're animating this pseudo-element in order to give the toggle groove
  // background an animation in and out.
  &:before {
    content: "";
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

  .${inputStyle}:checked:not(:disabled) + & {
    transition-delay: ${transitionInMS}ms;
    // We set background-color here to avoid a small issue with overflow clipping
    // that makes this look less seamless than it should.
    background-color: ${colors.mongodb.blue};
    border: 1px solid #2E9ED3;

    &:before {
      transform: scale(1);
      opacity: 1
    }
  }

  .${inputStyle}:disabled + & {
    background-color: rgba(29, 36, 36, 0.08);
    box-shadow: none;
    border: 1px solid rgba(0, 0, 0, 0.03);

    &:before {
      opacity: 0;
    }
  }
`;

const grooveVariants = {
  default: css`
    background-color: rgba(29, 36, 36, 0.1);
    border: 1px solid rgba(18, 22, 22, 0.05);
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  `,

  dark: css`
    background-color: rgba(29, 36, 36, 0.6);
    border: 1px solid rgba(18, 22, 22, 0.1);
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.15);
  `,
}

const grooveSizes = {
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
}


const sliderStyle = css`
  transition: all ${transitionInMS}ms ease-in-out;
  border-radius: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;

  &:before, &:after {
    content: "";
    transition: opacity ${transitionInMS}ms ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &:after {
    opacity: 0;
    background-image: linear-gradient(rgba(220, 220, 220, 0), rgba(220, 220, 220, 0.5));
  }

  .${inputStyle}:disabled + .${grooveStyle} > & {
    background-color: rgba(0, 0, 0, 0.08);
    background-image: none;
    box-shadow: none;
  }

  .${inputStyle}:checked:not(:disabled) + .${grooveStyle} > & {
    background-color: white;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.25), inset 0 -1px 0 #F1F1F1;
    border: 1px solid rgba(18, 22, 22, 0.05);

    &:before {
      opacity: 0;
    }

    &:after {
      opacity: 1;
    }
  }
`;

const sliderVariants = {
  default: css`
    background-color: white;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.25), inset 0 -1px 0 #F1F1F1;

    &:before {
      background-image: linear-gradient(rgba(220, 220, 220, 0), rgba(220, 220, 220, 0.5));
    }
  `,

  dark: css`
    background-color: #6F767B;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.25), inset 0 -1px 0 #454D53;

    &:before {
      background-image: linear-gradient(rgba(88, 95, 98, 0), rgba(88, 95, 98, 0.5));
    }
  `,
}

const sliderSizes = {
  default: css`
    height: 28px;
    width: 28px;
    left: 1px;

    .${inputStyle}:checked + .${grooveStyle} > & {
      transform: translate3d(30px, 0, 0);
    }
  `,

  small: css`
    height: 20px;
    width: 20px;
    left: 0;

    .${inputStyle}:checked + .${grooveStyle} > & {
      transform: translate3d(18px, 0, 0);
    }
  `,

  xsmall: css`
    height: 12px;
    width: 12px;
    left: 0;

    .${inputStyle}:checked + .${grooveStyle} > & {
      transform: translate3d(12px, 0, 0);
    }
  `,
}

const containerStyle = css`
  position: relative;
  cursor: pointer;

  /* Use [disabled] instead of &:disabled as this isn't an input element */
  &[disabled] {
    cursor: not-allowed;
  }
`;

export default class Checkbox extends PureComponent {
  static displayName = 'Checkbox';

  static defaultProps = {
    size: 'default',
    variant: 'default',
    label: '',
    disabled: false,
    className: '',
    onChange: () => {},
  };

  static propTypes = {
    size: PropTypes.oneOf(['default', 'small', 'xsmall']),
    variant: PropTypes.oneOf(['default', 'dark']),
    checked: PropTypes.bool,
    label: PropTypes.node,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
  };

  state = { checked: false };

  inputRef = React.createRef();
  checkboxId = `checkbox-${Math.floor(Math.random() * 10000000)}`;

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
      name = `${this.checkboxId}`,
      checked = this.state.checked,
      className,
      label,
      disabled,
      size,
      variant,
      ...rest
    } = this.props;

    return (
      <label
        className={ccClassName(className, containerStyle)}
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
          onChange={this.onChange}
        />

        <div className={ccClassName(grooveStyle, grooveSizes[size], grooveVariants[variant])}>
          <div className={ccClassName(sliderStyle, sliderSizes[size], sliderVariants[variant])} />
        </div>
      </label>
    );
  }
}
