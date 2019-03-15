import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import * as style from './style.js';
import { ccClassName } from '@leafygreen-ui/lib';
export default class RadioBox extends PureComponent {
  static displayName = 'RadioBox';

  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    children: PropTypes.node,
  };

  static defaultProps = {
    onChange: () => {},
    disabled: false,
    className: '',
  };

  render() {
    const {
      className,
      onChange,
      value,
      checked,
      disabled,
      id,
      size,
      children,
      ...rest
    } = this.props;

    // not sure of the cleanest way to do this, but the full size
    // has to live on the wrapper, whereas the other two sizes
    // live on the display box, because the full is responding
    // to the group's flex container whereas the rest are fix pixels or padding
    const radioBoxSize = style.radioBoxSizes[size];
    const full = size === 'full' && style.radioBoxSizes[size];

    return (
      <label
        htmlFor={id}
        className={ccClassName(style.radioWrapper, full, className)}
      >
        <input
          {...rest}
          type="radio"
          id={id}
          name={name}
          onChange={onChange}
          value={value}
          checked={checked}
          aria-checked={checked}
          disabled={disabled}
          aria-disabled={disabled}
          className={style.radioInput}
        />
        <div className={ccClassName(style.radioDisplay, radioBoxSize)}>
          {children}
        </div>
      </label>
    );
  }
}
