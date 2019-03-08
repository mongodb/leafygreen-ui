import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import * as style from './style.js';

import { ccClassName } from '@leafygreen-ui/lib';

export default class RadioBoxGroup extends PureComponent {
  static displayName = 'RadioBoxGroup';

  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['tightContentBox', 'default', 'full']),
    className: PropTypes.string,
  };

  static defaultProps = {
    onChange: () => {},
    size: 'default',
  };

  state = {
    value: '',
  };

  defaultName = `radio-box-group-${Math.floor(Math.random() * 1000000)}`;

  handleChange = e => {
    const { onChange, value } = this.props;

    // Exposing both event and event.target.value, rather than just one or the other
    // Stopped propagation to prevent event from bubbling with new target, and thus value coming back as undefined
    if (onChange) {
      onChange(e, e.target.value);
      e.stopPropagation();
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
      ...rest
    } = this.props;

    const renderChildren = React.Children.map(children, (child, index) => {
      if (child.type.displayName !== 'RadioBox') {
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
      <div {...rest} className={ccClassName(style.baseGroupStyle, className)}>
        {renderChildren}
      </div>
    );
  }
}
