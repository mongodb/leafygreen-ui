import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RadioButton from '../../RadioButton/src/index';

import { colors } from '@leafygreen-ui/theme';
import { ccClassName, emotion } from '@leafygreen-ui/lib';

const { css } = emotion;

const groupVariants = {
  default: css`
    color: ${colors.gray[2]};
  `,

  light: css`
    color: ${colors.gray[6]};
  `,
};

const baseStyle = css`
  padding: 5px;
  display: flex;
  flex-direction: column;
  font-size: 12px;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;
export default class RadioGroup extends Component {
  static displayName = 'RadioGroup';

  static defaultProps = {
    variant: 'default',
    className: '',
    onChange: () => {},
    name: '',
  };

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    children: PropTypes.node,
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  state = {
    value: this.props.value,
    updatedChildren: [],
  };

  componentDidMount = () => {
    const { children } = this.props;

    const updatedChildren = React.Children.map(children, child => {
      if (child.type !== RadioButton) {
        return child;
      }

      return React.cloneElement(child, {
        value: child.props.value || Math.floor(Math.random() * 10000000),
      });
    });

    this.setState({ updatedChildren });
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

    const renderChildren = React.Children.map(
      this.state.updatedChildren,
      (child, index) => {
        if (child.type !== RadioButton) {
          return child;
        }

        console.log(child.props.value, this.state.value);

        return React.cloneElement(child, {
          checked: this.state.value == child.props.value,
          disabled: child.props.disabled,
          value: child.props.value,
          handleChange: this.handleChange,
          id: index,
          variant,
          name,
        });
      },
    );

    const variantStyle = groupVariants[variant] || groupVariants.default;

    return (
      <form
        className={ccClassName(
          css`
            ${variantStyle} +${baseStyle}
          `,
          className,
        )}
      >
        {renderChildren}
      </form>
    );
  }
}
