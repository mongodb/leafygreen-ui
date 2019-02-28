import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const baseStyle = css`
  display: flex;

  .radio-button {
    padding: 0;
    position: relative;

    &:text {
      cursor: pointer;
      display: block;
      margin: 0;
      text-align: center;
      padding: 16px 10px;
    }

    input[type='radio'] {
      display: block;
      left: 0;
      height: 100%;
      top: 0;
      position: absolute;
      visibility: hidden;
      width: 100%;
    }
  }
`;
export default class RichRadioGroup extends Component {
  static displayName = 'RichRadioGroup';

  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    name: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    size: PropTypes.oneOf(['xsmall', 'small', 'normal', 'large']),
  };

  static defaultProps = {
    onChange: () => {},
    size: 'normal'
  };

  state = {
    value: this.props.value,
  };

  defaultName = `radio-group-${Math.floor(Math.random() * 1000000)}`;

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
    const { children, name, className, size } = this.props;

    const renderChildren = React.Children.map(children, (child, index) => {
      if (child.type.displayName !== 'RadioButton') {
        return child;
      }
      return React.cloneElement(child, {
        onChange: this.handleChange,
        checked: this.state.value === child.props.value,
        id: child.props.id || `${this.defaultName}-button-${index}`,
        size,
        name,
      });
    });

    return (
      <div className={ccClassName(css`${baseStyle}`, className)}>
        {renderChildren}
      </div>
    );
  }
}
