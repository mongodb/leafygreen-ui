import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
`;

export default class RadioGroup extends PureComponent {
  static displayName = 'RadioGroup';

  static propTypes = {
    variant: PropTypes.oneOf(['default', 'light']),
    className: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
    children: PropTypes.node,
    name: PropTypes.string,
  };

  static defaultProps = {
    variant: 'default',
    className: '',
    onChange: () => {},
  };

  state = {
    value: '',
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
    const {
      children,
      name = this.defaultName,
      className,
      variant,
    } = this.props;

    const { value = this.state.value } = this.props;

    // React.Children.map allows us to not pass key as prop while iterating over children
    const renderChildren = React.Children.map(children, (child, index) => {
      if (child.type.displayName !== 'Radio') {
        return child;
      }

      return React.cloneElement(child, {
        onChange: this.handleChange,
        checked: value === child.props.value,
        id: child.props.id || `${this.defaultName}-button-${index}`,
        variant,
        name,
      });
    });

    const variantStyle = groupVariants[variant];

    return (
      <div
        className={ccClassName(
          css`
            ${variantStyle} ${baseStyle}
          `,
          className,
        )}
      >
        {renderChildren}
      </div>
    );
  }
}
