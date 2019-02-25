import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../../RadioButton/src/index';

import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const groupVariants = {
  default: css`
    display: flex;
    flex-direction: column;
    background-color: ${colors.gray[8]};
    color: ${colors.gray[1]}
    padding: 5px;

    &:hover {
        color: red;
    }
  `,
};
export default class RadioGroup extends Component {
  static displayName = 'RadioGroup';

  static defaultProps = {
    variant: 'default',
    size: 'normal',
    className: '',
    onChange: () => {},
    name: '',
  };

  static propTypes = {
    variant: PropTypes.oneOf(['default']),
    size: PropTypes.oneOf(['normal']),
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    children: PropTypes.node,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    value: this.props.value,
  };

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
    const { children, name, className, variant } = this.props;

    const renderChildren = React.Children.map(children, (child, index) => {
      if (child.type !== RadioButton) {
        return child;
      }

      return React.cloneElement(child, {
        checked: this.state.value === child.props.value,
        disabled: child.props.disabled,
        value: child.props.value,
        handleChange: this.handleChange,
        id: index,
        name,
      });
    });

    const variantStyle = groupVariants[variant] || groupVariants.default;

    console.log(colors);

    return (
      <form
        className={ccClassName(
          css`
            ${variantStyle}
          `,
          className,
        )}
      >
        {renderChildren}
      </form>
    );
  }
}
