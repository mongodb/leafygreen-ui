import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as style from './style.js';

import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;
export default class RichRadioGroup extends Component {
  static displayName = 'RichRadioGroup';

  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['tightContentBox', 'small', 'medium', 'full']),
    className: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
    size: 'medium',
  };

  state = {
    value: '',
  };

  defaultName = `rich-radio-group-${Math.floor(Math.random() * 1000000)}`;

  handleChange = e => {
    const { onChange, value } = this.props;

    if (onChange) {
      onChange(e);
    }

    if (!value) {
      this.setState({ value: e.target.value });
    }
  };

  render() {
    const {
      children,
      name = this.defaultName,
      className,
      size,
      value = this.state.value,
    } = this.props;

    const renderChildren = React.Children.map(children, (child, index) => {
      if (child.type.displayName !== 'RichRadioInput') {
        return child;
      }

      return React.cloneElement(child, {
        onChange: this.handleChange,
        checked: value === child.props.value,
        id: child.props.id || `${this.defaultName}-button-${index}`,
        size,
        name,
      });
    });

    return (
      <div className={ccClassName(style.baseGroupStyle, className)}>
        {renderChildren}
      </div>
    );
  }
}
