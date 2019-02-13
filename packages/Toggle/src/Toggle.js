import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ccClassName } from '@leafygreen-ui/lib';
import {
  containerStyle,
  containerSizes,
  inputStyle,
  focusState,
  grooveStyle,
  grooveVariants,
  sliderStyle,
  sliderSizes,
  sliderVariants,
  onLabelStyle,
  offLabelStyle,
} from './style';

export default class Toggle extends PureComponent {
  static displayName = 'Toggle';

  static defaultProps = {
    size: 'default',
    variant: 'default',
    disabled: false,
    className: '',
    onChange: () => {},
  };

  static propTypes = {
    size: PropTypes.oneOf(['default', 'small', 'xsmall']),
    variant: PropTypes.oneOf(['default', 'dark']),
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
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
      name = this.checkboxId,
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
        className={ccClassName(className, containerStyle, containerSizes[size])}
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

        <div className={focusState} />

        <div className={ccClassName(grooveStyle, grooveVariants[variant])}>
          {size === 'default' && !disabled &&
            <>
              <div className={onLabelStyle}>On</div>
              <div className={offLabelStyle}>Off</div>
            </>
          }

          <div
            className={ccClassName(
              sliderStyle,
              sliderSizes[size],
              sliderVariants[variant],
            )}
          />
        </div>
      </label>
    );
  }
}
