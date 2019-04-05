import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ccClassName } from '@leafygreen-ui/lib';
import * as style from './style';

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

    return (
      <label
        className={ccClassName(
          className,
          style.container,
          style.containerSizes[size],
        )}
        htmlFor={this.checkboxId}
        disabled={disabled}
      >
        <input
          {...rest}
          id={this.checkboxId}
          className={style.input}
          type="checkbox"
          role="checkbox"
          name={name}
          disabled={disabled}
          checked={checked}
          aria-disabled={disabled}
          aria-checked={checked}
          onChange={this.onChange}
        />

        <div className={style.focusState} />

        <div
          className={ccClassName(style.groove, style.grooveVariants[variant])}
        >
          {size === 'default' && !disabled && (
            <>
              <div className={style.onLabel}>On</div>
              <div className={style.offLabel}>Off</div>
            </>
          )}

          <div
            className={ccClassName(
              style.slider,
              style.sliderSizes[size],
              style.sliderVariants[variant],
            )}
          />
        </div>
      </label>
    );
  }
}
